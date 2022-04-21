import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class CardAlbum extends Component {
  render() {
    const { coverImg, albumName, id, artistName } = this.props;
    return (
      <div className="card">
        <img src={ coverImg } alt={ `Capa do álbum ${albumName}` } className="card-img" />
        <div className="card-body">
          <Link
            to={ `/album/${id}` }
            data-testid={ `link-to-album-${id}` }
          >
            { albumName }
          </Link>
          <h5 className="card-title">{ artistName }</h5>
        </div>
      </div>
    );
  }
}

CardAlbum.propTypes = ({
  artistName: PropTypes.string,
  albumName: PropTypes.string,
  coverImg: PropTypes.string,
  id: PropTypes.number,
}).isRequired;

export default CardAlbum;
