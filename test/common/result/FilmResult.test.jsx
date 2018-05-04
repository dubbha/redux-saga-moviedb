import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import FilmResult from 'common/result/FilmResult';

describe('FilmResult', () => {
  let props;

  beforeEach(() => {
    props = {
      film: { director: 'QUENTIN TARANTINO' },
    };
  });

  it('should render successfully with director', () => {
    const wrapper = shallow(<FilmResult {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render successfully without director', () => {
    props.film.director = null;
    const wrapper = shallow(<FilmResult {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
