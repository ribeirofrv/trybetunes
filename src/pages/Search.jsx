import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  constructor() {
    super();
    this.state = { search: '' };
    this.SearchInput = this.SearchInput.bind(this);
    this.isSearchButtonDisabled = this.isSearchButtonDisabled.bind(this);
  }

  SearchInput({ target }) {
    const { value } = target;
    this.setState({ search: value });
  }

  isSearchButtonDisabled() {
    const { search } = this.state;
    const size = 2;

    if (search.length >= size) return false;

    return true;
  }

  render() {
    return (
      <div data-testid="page-search">
        <Header />
        <input
          data-testid="search-artist-input"
          onChange={ this.SearchInput }
        />
        <button
          type="submit"
          data-testid="search-artist-button"
          onClick={ () => console.log('pesquisar') }
          disabled={ this.isSearchButtonDisabled() }
        >
          Pesquisar

        </button>
      </div>
    );
  }
}

export default Search;
