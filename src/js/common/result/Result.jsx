import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SearchResult from './SearchResult';
import FilmResult from './FilmResult';
import ErrorBoundary from '../errorBoundary';
import filmPropShape from '../utils/propShapes';
import './style.sass';

export default class Result extends PureComponent {
  static defaultProps = {
    results: [],
    film: null,
    sortBy: null,
    onSortByChange: null,
    sortByParams: null,
  };

  static propTypes = {
    results: PropTypes.arrayOf(PropTypes.shape(filmPropShape)),
    film: PropTypes.shape(filmPropShape),
    sortBy: PropTypes.string,
    onSortByChange: PropTypes.func,
    sortByParams: PropTypes.arrayOf(PropTypes.string),
  };

  render() {
    const {
      results,
      film,
      sortBy,
      onSortByChange,
      sortByParams,
    } = this.props;

    return (
      <div className="result">
        <ErrorBoundary>
          {
            film
              ? (
                <FilmResult film={film} />
              )
              : (
                <SearchResult
                  results={results}
                  sortBy={sortBy}
                  onSortByChange={onSortByChange}
                  sortByParams={sortByParams}
                />
              )
          }
        </ErrorBoundary>
      </div>
    );
  }
}
