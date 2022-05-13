import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = { collection: {}, tracks: [], isLoading: true, favoriteSongs: [] };

    this.getMusicsPreview = this.getMusicsPreview.bind(this);
    this.favoriteSongs = this.favoriteSongs.bind(this);
    this.updateFavoriteSongs = this.updateFavoriteSongs.bind(this);
  }

  async componentDidMount() {
    await this.getMusicsPreview();
    await this.favoriteSongs();
  }

  async getMusicsPreview() {
    const { match: { params: { id } } } = this.props;

    const albumPreview = await getMusics(id);
    const tracks = albumPreview.filter((key) => key.kind === 'song');

    this.setState(({ collection: albumPreview[0], tracks }));
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
    const {
      isLoading,
      collection: {
        artistName,
        collectionName,
      }, tracks,
      favoriteSongs } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
      <div data-testid="page-album">
        <Header />
        <div>
          <h1 data-testid="artist-name">
            { artistName }
          </h1>
          <h2 data-testid="album-name">
            { collectionName }
          </h2>
        </div>
        {tracks.map((track) => (
          <MusicCard
            key={ track.trackId }
            trackName={ track.trackName }
            previewUrl={ track.previewUrl }
            trackId={ track.trackId }
            track={ track }
            favoriteSongs={ favoriteSongs }
            updateFavoriteSongs={ this.updateFavoriteSongs }
          />
        ))}
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
};

export default Album;
