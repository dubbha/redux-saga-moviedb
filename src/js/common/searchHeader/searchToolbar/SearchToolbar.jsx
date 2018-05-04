import React from 'react';
import PropTypes from 'prop-types';
import SearchBySwitch from './SearchBySwitch';
import SearchButton from './SearchButton';

const SearchToolbar = ({ searchBy, onSearchByChange, searchByParams }) => (
  <div className="searchToolbar">
    <SearchBySwitch
      searchBy={searchBy}
      onSearchByChange={onSearchByChange}
      searchByParams={searchByParams}
    />
    <SearchButton
      text="search"
      type="submit"
      size="large"
      isActive
    />
  </div>
);

SearchToolbar.propTypes = {
  searchBy: PropTypes.string.isRequired,
  onSearchByChange: PropTypes.func.isRequired,
  searchByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchToolbar;
