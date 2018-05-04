import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import List from 'common/list';

describe('List', () => {
  let props;

  beforeEach(() => {
    props = {
      results: [
        { id: 87654321 },
        { id: 13572468 },
        { id: 12345678 },
      ],
      film: {
        id: 12345678,
        title: 'TITLE',
        director: 'DIRECTOR',
        overview: 'OVERVIEW',
        poster_path: 'POSTER_PATH',
        release_date: '2000/12/31',
        runtime: 120,
        vote_average: 5.0,
        genre_ids: [1, 2, 3],
        cast: [
          { name: 'NAME1' },
          { name: 'NAME2' },
          { name: 'NAME3' },
        ],
      },
      onSelectFilm: jest.fn(),
      isLoading: false,
    };
  });

  it('should render a filtered list if passed with a film object', () => {
    const wrapper = shallow(<List {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a full list if not passed with a film object', () => {
    props.film = null;

    const wrapper = shallow(<List {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render an empty list notification if the list is empty', () => {
    props.results = [];

    const wrapper = shallow(<List {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render a spinner if is currently loading', () => {
    const wrapper = shallow(<List {...props} isLoading />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
