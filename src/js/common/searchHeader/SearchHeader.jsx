import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../logo';
import SearchToolbar from './searchToolbar';
import ErrorBoundary from '../errorBoundary';
import './style.sass';

const SearchHeader = ({
  query,
  onSearch,
  onQueryChange,
  searchBy,
  onSearchByChange,
  searchByParams,
}) => (
  <header className="search">
    <ErrorBoundary>
      <Logo />
      <div className="search__header">find your movie</div>
      <form
        autoComplete="off"
        onSubmit={onSearch}
      >
        <div className="search__container">
          <input
            type="text"
            className="search__input"
            name="search"
            value={query}
            onChange={onQueryChange}
          />
          <div className="search__icon" />
        </div>
        <SearchToolbar
          searchBy={searchBy}
          onSearchByChange={onSearchByChange}
          searchByParams={searchByParams}
        />
      </form>
    </ErrorBoundary>
  </header>
);

SearchHeader.defaultProps = {
  query: '',
};

SearchHeader.propTypes = {
  query: PropTypes.string,
  onSearch: PropTypes.func.isRequired,
  onQueryChange: PropTypes.func.isRequired,
  searchBy: PropTypes.string.isRequired,
  onSearchByChange: PropTypes.func.isRequired,
  searchByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchHeader;
