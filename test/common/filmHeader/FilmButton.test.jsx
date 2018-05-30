import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilmButton from 'common/filmHeader/FilmButton';

describe('FilmButton', () => {
  const props = { onSearchClick: jest.fn() };

  it('should render successfully', () => {
    const wrapper = shallow(<FilmButton {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should never update', () => {
    const instance = new FilmButton(props);
    expect(instance.shouldComponentUpdate()).toBe(false);
  });
});
