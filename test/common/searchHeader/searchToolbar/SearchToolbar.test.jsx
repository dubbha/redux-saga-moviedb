import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchToolbar from 'common/searchHeader/searchToolbar';

describe('SearchToolbar', () => {
  let props;

  beforeEach(() => {
    props = {
      searchBy: 'title',
      searchByParams: ['title', 'director'],
      onSearchByChange: jest.fn(),
    };
  });

  it('should render successfully', () => {
    const wrapper = shallow(<SearchToolbar {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
