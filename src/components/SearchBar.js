import React from 'react';

class SearchBar extends React.Component {
  state = { term: '' };

  onFormSubmit = (e) => {
    e.preventDefault();

    this.props.onSearchSubmit(this.state.term);
  };

  render() {
    return (
      <div className="ui segment">
        <form className="ui form" onSubmit={this.onFormSubmit}>
          <label>Find your image</label>
          <input
            className=""
            type="text"
            onChange={(e) => this.setState({ term: e.target.value })}
            value={this.state.term}
            placeholder="write your search term and press enter"
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
