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
          <label>Image serach</label>
          <input
            className=""
            type="text"
            onChange={(e) => this.setState({ term: e.target.value })}
            value={this.state.term}
          />
        </form>
      </div>
    );
  }
}

export default SearchBar;
