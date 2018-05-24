import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SearchBySwitch from './SearchBySwitch';
import SearchButton from './SearchButton';

export default class SearchToolbar extends PureComponent {
  static propTypes = {
    searchBy: PropTypes.string.isRequired,
    onSearchByChange: PropTypes.func.isRequired,
    searchByParams: PropTypes.arrayOf(PropTypes.string).isRequired,
  };

  render() {
    const { searchBy, onSearchByChange, searchByParams } = this.props;

    return (
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
  }
}
