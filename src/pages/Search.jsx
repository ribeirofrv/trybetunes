import React, { Component } from 'react';
import Loading from '../components/Loading';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';
import CardAlbum from '../components/CardAlbum';

class Search extends Component {
  constructor() {
    super();
    this.state = { search: '', isLoading: false, albums: [], searchDidComply: false };
    this.SearchInput = this.SearchInput.bind(this);
    this.isSearchButtonDisabled = this.isSearchButtonDisabled.bind(this);
    this.SearchArtist = this.SearchArtist.bind(this);
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

  async SearchArtist() {
    const { search } = this.state;
    this.setState((prevState) => ({ ...prevState, isLoading: true }));
    const results = await searchAlbumsAPI(search);
    const match = results.length > 0;
    this.setState((prevState) => (
      { ...prevState,
        isLoading: false,
        albums: results,
        searchDidComply: match }));
  }

  render() {
    const { search, isLoading, albums, searchDidComply } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <section data-testid="page-search">
        <Header />
        <section>
          <input
            data-testid="search-artist-input"
            onChange={ this.SearchInput }
          />
          <button
            type="submit"
            data-testid="search-artist-button"
            onClick={ this.SearchArtist }
            disabled={ this.isSearchButtonDisabled() }
          >
            Pesquisar

          </button>
        </section>
        <section>
          <h2>{`Resultado de álbuns de: ${search}`}</h2>
          { searchDidComply && (
            albums.map(
              ({ artworkUrl100,
                artistName,
                collectionId,
                collectionName,
              }) => (
                <CardAlbum
                  key={ collectionId }
                  albumName={ collectionName }
                  coverImg={ artworkUrl100 }
                  id={ collectionId }
                  artistName={ artistName }
                />
              ),
            )) }
          {!searchDidComply && <h1>Nenhum álbum foi encontrado</h1>}
        </section>
      </section>
    );
  }
}

export default Search;
