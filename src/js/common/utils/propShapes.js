import PropTypes from 'prop-types';

const filmPropShape = {
  id: PropTypes.number,
  title: PropTypes.string,
  director: PropTypes.string,
  overview: PropTypes.string,
  poster_path: PropTypes.string,
  release_date: PropTypes.string,
  runtime: PropTypes.number,
  vote_average: PropTypes.number,
  genre_ids: PropTypes.arrayOf(PropTypes.number),
  cast: PropTypes.arrayOf(PropTypes.shape({ name: PropTypes.string })),
};

export default filmPropShape;
