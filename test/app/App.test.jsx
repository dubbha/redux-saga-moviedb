import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from 'app/App.jsx';

describe('app/App', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
