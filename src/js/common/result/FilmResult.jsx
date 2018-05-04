import React from 'react';
import PropTypes from 'prop-types';
import './style.sass';

const Result = ({ film }) => (
  <div>
    {
      film.director
        ? `Films by ${film.director}`
        : 'Director unknown'
    }
  </div>
);

Result.propTypes = {
  film: PropTypes.shape({
    director: PropTypes.string,
  }).isRequired,
};

export default Result;
