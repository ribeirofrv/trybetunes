import React, { Component } from 'react';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Favorites extends Component {
  constructor() {
    super();
    this.state = { isLoading: true, favoriteSongs: [] };

    this.favoriteSongs = this.favoriteSongs.bind(this);
    this.updateFavoriteSongs = this.updateFavoriteSongs.bind(this);
  }

  async componentDidMount() {
    await this.favoriteSongs();
  }

  async favoriteSongs() {
    const favoriteSongs = await getFavoriteSongs();

    this.setState((prevState) => (
      { ...prevState, favoriteSongs }
    ), () => {
      this.setState({ isLoading: false });
    });
  }

  async updateFavoriteSongs() {
    const favoriteSongs = await getFavoriteSongs();
    this.setState({ favoriteSongs });
  }

  render() {
    const { isLoading, favoriteSongs } = this.state;
    return isLoading ? (
      <Loading />
    ) : (
      <div data-testid="page-favorites">
        <Header />
        {favoriteSongs.map((track) => (
          <>
            <p data-testid="artist-name">
              {track.artistName}
            </p>
            <p data-testid="album-name">
              {track.collectionName}
            </p>
            <MusicCard
              key={ track.trackId }
              trackName={ track.trackName }
              previewUrl={ track.previewUrl }
              trackId={ track.trackId }
              track={ track }
              favoriteSongs={ favoriteSongs }
              updateFavoriteSongs={ this.updateFavoriteSongs }
            />

          </>
        ))}
      </div>
    );
  }
}

export default Favorites;
