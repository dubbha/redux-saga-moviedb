import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchHeader from 'common/searchHeader';

describe('SearchHeader', () => {
  let props;

  beforeEach(() => {
    props = {
      searchBy: 'director',
      searchByParams: ['title', 'director'],
      onSearch: jest.fn(),
      onSearchByChange: jest.fn(),
      onQueryChange: jest.fn(),
    };
  });

  it('should render successfully', () => {
    const wrapper = shallow(<SearchHeader {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should pass the query string if available', () => {
    props.query = 'QUERY';
    const wrapper = shallow(<SearchHeader {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
