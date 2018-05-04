import React from 'react';
import PropTypes from 'prop-types';

const FilmButton = ({ onSearchClick }) => (
  <button
    type="button"
    className="film__button"
    onClick={onSearchClick}
  >
    Search
  </button>
);

FilmButton.propTypes = {
  onSearchClick: PropTypes.func.isRequired,
};

export default FilmButton;
