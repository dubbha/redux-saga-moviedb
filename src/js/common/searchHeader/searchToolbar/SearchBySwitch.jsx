import React from 'react';
import PropTypes from 'prop-types';
import SearchButton from './SearchButton';

const SearchBySwitch = ({ searchBy, onSearchByChange, searchByParams }) => (
  <div className="searchBySwitch">
    <span className="searchBySwitch__text">Search By</span>
    {
      searchByParams.map(item => (
        <SearchButton
          key={item}
          text={item}
          isActive={searchBy === item}
          onClickWithText={onSearchByChange}
        />
      ))
    }
  </div>
);

SearchBySwitch.propTypes = {
  searchBy: PropTypes.string.isRequired,
  onSearchByChange: PropTypes.func.isRequired,
  searchByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default SearchBySwitch;
