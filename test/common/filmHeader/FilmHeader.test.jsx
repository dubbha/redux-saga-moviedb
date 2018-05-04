import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilmHeader from 'common/filmHeader';

describe('FilmHeader', () => {
  it('should render successfully', () => {
    const props = {
      onSearchClick: jest.fn(),
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
    };
    const wrapper = shallow(<FilmHeader {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
