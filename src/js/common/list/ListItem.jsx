import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { imgUrl } from '../config/api.config';
import filmPropShape from '../utils/propShapes';
import parseYear from '../utils/parseYear';
import mapGenres from '../utils/mapGenres';

export default class ListItem extends Component {
  static propTypes = {
    item: PropTypes.shape(filmPropShape).isRequired,
    onSelectFilm: PropTypes.func.isRequired,
  };

  handleSelectFilm = () => {
    const { onSelectFilm, item } = this.props;

    onSelectFilm(item);
  }

  render() {
    const { item } = this.props;

    return (
      <div className="list__item">
        <div className="list__container">
          <a
            role="link"
            tabIndex={0}
            className="list__link"
            onClick={this.handleSelectFilm}
          >
            <img
              src={`${imgUrl}${item.poster_path}`}
              alt={item.title}
              className="list__image"
            />
          </a>
          <div className="list__titleYearBlock">
            <a
              role="link"
              tabIndex={-1}
              className="list__link list__title"
              onClick={this.handleSelectFilm}
            >
              {item.title}
            </a>
            <span className="list__year">
              {parseYear(item.release_date)}
            </span>
          </div>
          <div className="list__category">
            {mapGenres(item.genre_ids)}
          </div>
        </div>
      </div>
    );
  }
}
