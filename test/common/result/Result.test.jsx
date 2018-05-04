import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Result from 'common/result/Result';

describe('FilmResult', () => {
  let props;

  beforeEach(() => {
    props = {
      film: { id: 1 },
      results: [{ id: 1 }, { id: 2 }, { id: 3 }, { id: 4 }, { id: 5 }],
      sortBy: 'rating',
      sortByParams: ['release date', 'rating'],
      onSortByChange: jest.fn(),
    };
  });

  it('should render film result if film is available', () => {
    const wrapper = shallow(<Result {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render search result otherwise', () => {
    props.film = null;
    const wrapper = shallow(<Result {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
