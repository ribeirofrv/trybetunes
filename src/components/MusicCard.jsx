import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';
import Loading from './Loading';

class MusicCard extends Component {
  constructor() {
    super();
    this.state = { isLoading: false, isChecked: false };
    this.addFavoriteSong = this.addFavoriteSong.bind(this);
    this.onFavoriteCheckboxClick = this.onFavoriteCheckboxClick.bind(this);
  }

  async componentDidMount() {
    await this.addFavoriteSong;
    await this.onFavoriteCheckboxClick;
  }

  async onFavoriteCheckboxClick({ target: { checked } }) {
    // console.log(checked);
    this.setState({ isChecked: checked, isLoading: true });
    await this.addFavoriteSong();
  }

  async addFavoriteSong() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isChecked } = this.state;

    const songDetails = { trackName, previewUrl, trackId };

    this.setState({ isLoading: true });
    if (isChecked) await addSong(songDetails);
    this.setState({ isLoading: false });
  }

  render() {
    const { trackName, previewUrl, trackId } = this.props;
    const { isLoading, isChecked } = this.state;
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
            onChange={ this.onFavoriteCheckboxClick }
            checked={ isChecked }
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
