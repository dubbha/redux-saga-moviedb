import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchBySwitch from 'common/searchHeader/searchToolbar/SearchBySwitch';

describe('SearchSortByLink', () => {
  let props;

  beforeEach(() => {
    props = {
      searchBy: 'title',
      searchByParams: ['title', 'director'],
      onSearchByChange: jest.fn(),
    };
  });

  it('should render successfully', () => {
    const wrapper = shallow(<SearchBySwitch {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should switch the active link according to the selected sort by parameter', () => {
    props.searchBy = 'director';
    const wrapper = shallow(<SearchBySwitch {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
