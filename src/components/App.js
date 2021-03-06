import React from 'react';
import SearchBar from './SearchBar';
import ImageList from './ImageList';
import unsplash from '../api/unsplash';

class App extends React.Component {
  state = { images: [], term: '', page: null, err: null };

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

    if (response.data.total === 0) {
      this.setState({ err: 'No result please try again :(' });
    } else {
      this.setState({ err: null });
      this.setState({ term });
      this.setState({ page: this.getNextPage(response) });
      this.setState({ images: response.data.results });
    }
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

  renderContent() {
    if (this.state.err) {
      return <h2>{this.state.err}</h2>;
    } else {
      return (
        <>
          <ImageList images={this.state.images} />
          <button className="loadBtn" onClick={this.getMoreImages}>
            more
          </button>
        </>
      );
    }
  }

  render() {
    return (
      <div
        className="ui container"
        style={{ marginTop: '30px', paddingBottom: '10px' }}
      >
        <SearchBar onSearchSubmit={this.onSearchSubmit} />
        {this.renderContent()}
      </div>
    );
  }
}

export default App;
