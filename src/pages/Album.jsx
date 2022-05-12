import React, { Component } from 'react';
import PropTypes from 'prop-types';
import getMusics from '../services/musicsAPI';
import Header from '../components/Header';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  constructor() {
    super();
    this.state = { collection: {}, tracks: [], isLoading: false };
    this.getMusicsPreview = this.getMusicsPreview.bind(this);
  }

  async componentDidMount() {
    await this.getMusicsPreview();
  }

  async getMusicsPreview() {
    const { match: { params: { id } } } = this.props;
    this.setState((prevState) => ({ ...prevState, isLoading: true }));

    const albumPreview = await getMusics(id);
    console.log(albumPreview);
    const tracks = albumPreview.filter((key) => key.kind === 'song');

    this.setState(({ isLoading: false, collection: albumPreview[0], tracks }));
  }

  render() {
    const { isLoading, collection: { artistName, collectionName }, tracks } = this.state;
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
        {tracks.map(({ trackId, trackName, previewUrl }) => (
          <MusicCard
            key={ trackId }
            trackName={ trackName }
            previewUrl={ previewUrl }
            trackId={ trackId }
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
