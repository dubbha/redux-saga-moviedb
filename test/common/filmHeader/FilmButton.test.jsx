import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilmButton from 'common/filmHeader/FilmButton';

describe('FilmButton', () => {
  it('should render successfully', () => {
    const props = { onSearchClick: jest.fn() };
    const wrapper = shallow(<FilmButton {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
