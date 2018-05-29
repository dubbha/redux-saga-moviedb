import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo';
import FilmButton from './FilmButton';
import ErrorBoundary from '../errorBoundary';
import filmPropShape from '../utils/propShapes';
import { imgUrl } from '../config/api.config';
import parseYear from '../utils/parseYear';
import mapGenres from '../utils/mapGenres';
import displayCast from '../utils/displayCast';
import './style.sass';

const FilmHeader = ({ film, onSearchClick }) => (
  <header className="film">
    <ErrorBoundary>
      <div className="film__headerContainer">
        <Logo />
        <FilmButton onSearchClick={onSearchClick} />
      </div>
      <div className="film__infoSection">
        <div className="film__poster">
          <img
            className="film__image"
            src={`${imgUrl}${film.poster_path}`}
            alt={film.title}
          />
        </div>
        <div className="film__details">
          <div className="film__title">
            {film.title}
            <div className="film__rating">
              {film.vote_average}
            </div>
          </div>
          <div className="film__category">
            {film.genre_ids && mapGenres(film.genre_ids)}
          </div>
          <div className="film__year">
            {film.release_date && parseYear(film.release_date)}
          </div>
          <div className="film__runtime">
            {film.runtime && `${film.runtime}  min`}
          </div>
          <div className="film__summary">
            {film.overview}
          </div>
          <div className="film__director">
            {film.director && `Director: ${film.director}`}
          </div>
          <div className="film__cast">
            {displayCast(film.cast)}
          </div>
        </div>
      </div>
    </ErrorBoundary>
  </header>
);

FilmHeader.propTypes = {
  film: PropTypes.shape(filmPropShape).isRequired,
  onSearchClick: PropTypes.func.isRequired,
};

export default FilmHeader;
