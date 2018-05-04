import React from 'react';
import PropTypes from 'prop-types';
import SearchSortByLink from './SearchSortByLink';
import filmPropShape from '../utils/propShapes';
import './style.sass';

const SearchResult = ({
  results,
  sortBy,
  onSortByChange,
  sortByParams,
}) => (
  results.length > 0
    ? (
      <div className="searchResult">
        <span className="searchResult__line">{`${results.length} movies found`}</span>
        <span className="searchResult__line">
          Sort by
          {
            sortByParams.map(item => (
              <SearchSortByLink
                key={item}
                text={item}
                isActive={sortBy === item}
                onClickWithText={onSortByChange}
              />
            ))
          }
        </span>
      </div>
    ) : null
);

SearchResult.defaultProps = {
  results: [],
};

SearchResult.propTypes = {
  results: PropTypes.arrayOf(PropTypes.shape(filmPropShape)),
  sortBy: PropTypes.string.isRequired,
  onSortByChange: PropTypes.func.isRequired,
  sortByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchResult;
