import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import EmptyList from './EmptyList';
import ListItem from './ListItem';
import Spinner from './Spinner';
import Error from './Error';
import ErrorBoundary from '../errorBoundary';
import filmPropShape from '../utils/propShapes';
import './style.sass';

const filtered = (list, film) => {
  if (film) {
    return list.filter(item => item.id !== film.id);
  }
  return list;
};

export default class List extends PureComponent {
  static defaultProps = {
    results: [],
    film: {},
  };

  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape(filmPropShape)),
    film: PropTypes.shape(filmPropShape),
    onSelectFilm: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired,
    isError: PropTypes.bool.isRequired,
  };

  render() {
    const { results, film, onSelectFilm, isLoading, isError } = this.props;

    return (
      <section className="list">
        <ErrorBoundary>
          { isLoading && <Spinner /> }
          { isError && <Error /> }
          { !isLoading && !isError && results && (
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
  }
}
