import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ListItem from 'common/list/ListItem';

jest.mock('common/config/api.config', () => ({ imgUrl: 'https://IMAGE_URL/' }));

jest.mock('common/utils/parseYear', () => () => '2000');

jest.mock('common/utils/mapGenres', () => () => ['GENRE1', 'GENRE2', 'GENRE3']);

describe('ListItem', () => {
  let props;

  beforeEach(() => {
    props = {
      onSelectFilm: jest.fn(),
      item: {
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
  });

  it('should render successfully', () => {
    const wrapper = shallow(<ListItem {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should handle film being selected on image click', () => {
    const wrapper = shallow(<ListItem {...props} />);

    wrapper.find('.list__link').at(0).simulate('click');

    expect(props.onSelectFilm).toBeCalled();
  });

  it('should handle film being selected on title click', () => {
    const wrapper = shallow(<ListItem {...props} />);

    wrapper.find('.list__link .list__title').simulate('click');

    expect(props.onSelectFilm).toBeCalled();
  });
});
