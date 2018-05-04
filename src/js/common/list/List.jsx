import React from 'react';
import PropTypes from 'prop-types';
import EmptyList from './EmptyList';
import ListItem from './ListItem';
import Spinner from './Spinner';
import ErrorBoundary from '../errorBoundary';
import filmPropShape from '../utils/propShapes';
import './style.sass';

const filtered = (list, film) => {
  if (film) {
    return list.filter(item => item.id !== film.id);
  }
  return list;
};

const List = ({ results, film, onSelectFilm, isLoading }) => (
  <section className="list">
    <ErrorBoundary>
      { isLoading && <Spinner /> }
      { !isLoading && results && (
        results.length > 0
          ? filtered(results, film).map(item => (
            <ListItem
              item={item}
              key={item.id}
              onSelectFilm={onSelectFilm}
            />))
          : <EmptyList />
      )}
    </ErrorBoundary>
  </section>
);

List.defaultProps = {
  results: [],
  film: {},
};

List.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape(filmPropShape)),
  film: PropTypes.shape(filmPropShape),
  onSelectFilm: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default List;
