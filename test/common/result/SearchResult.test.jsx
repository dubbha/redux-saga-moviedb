import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchResult from 'common/result/SearchResult';

describe('SearchResult', () => {
  let props;

  beforeEach(() => {
    props = {
      results: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      sortBy: 'release date',
      sortByParams: ['release date', 'rating'],
      onSortByChange: jest.fn(),
    };
  });

  it('should render successfully', () => {
    const wrapper = shallow(<SearchResult {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should switch the active link according to the selected sort by parameter', () => {
    props.sortBy = 'rating';
    const wrapper = shallow(<SearchResult {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render emtpy on empty results list', () => {
    props.results = [];
    const wrapper = shallow(<SearchResult {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
