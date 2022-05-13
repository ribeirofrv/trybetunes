import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = { isLoading: false };

    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.isChecked = this.isChecked.bind(this);
  }

  async addFavoriteSong(track, { target: { checked } }) {
    const { updateFavoriteSongs } = this.props;

    this.setState({ isLoading: true }, async () => {
      if (checked === true) {
        await addSong(track);
      } else {
        await removeSong(track);
      }

      await updateFavoriteSongs();
      this.setState({ isLoading: false });
    });
  }

  isChecked() {
    const { favoriteSongs, trackId } = this.props;
    const isFavorite = favoriteSongs.some((song) => song.trackId === trackId);

    if (isFavorite) return true;
    return false;
  }

  render() {
    const {
      trackName,
      previewUrl,
      trackId,
      track } = this.props;

    const { isLoading } = this.state;

    return isLoading ? (
      <Loading />
    ) : (
      <div className="track-card">
        <span>{trackName}</span>
        <audio data-testid="audio-component" src={ previewUrl } controls>
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {' '}
          <code>audio</code>
          .
        </audio>
        <label
          htmlFor={ `checkbox-music-${trackId}` }
        >
          <span>
            Favorita
          </span>
          <input
            data-testid={ `checkbox-music-${trackId}` }
            type="checkbox"
            name="favorite"
            id={ `checkbox-music-${trackId}` }
            onChange={ (event) => this.addFavoriteSong(track, event) }
            checked={ this.isChecked() }
          />
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = ({
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
  trackId: PropTypes.string,
}).isRequired;

export default MusicCard;
