import React from 'react';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import unsplash from '../api/unsplash';

class App extends React.Component {
  state = { images: [], term: '', page: null };

  getNextPage = (res) => {
    return res.headers.link
      .split(',')
      .filter((el) => el.includes('rel="next"'))[0]
      .split('>')[0]
      .replace('<', '')
      .split('?')[1]
      .split('&')[0]
      .split('=')[1];
  };

  onSearchSubmit = async (term) => {
    const response = await unsplash.get('/search/photos', {
      params: {
        query: term,
      },
    });

    this.setState({ term });
    this.setState({ page: this.getNextPage(response) });
    this.setState({ images: response.data.results });
  };

  getMoreImages = async () => {
    const response = await unsplash.get('/search/photos', {
      params: {
        page: this.state.page,
        query: this.state.term,
      },
    });

    this.setState({ page: this.getNextPage(response) });
    this.setState({ images: [...this.state.images, ...response.data.results] });
  };

  componentDidMount() {
    this.onSearchSubmit('cars');
  }

  render() {
    return (
      <div
        className="ui container"
        style={{ marginTop: '30px', paddingBottom: '10px' }}
      >
        <SearchBar onSearchSubmit={this.onSearchSubmit} />
        <ImageList images={this.state.images} />
        <button className="loadBtn" onClick={this.getMoreImages}>
          more
        </button>
      </div>
    );
  }
}

export default App;
