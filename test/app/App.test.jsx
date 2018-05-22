import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import App from 'app/App.jsx';

jest.mock('react', () => {
  const reactMock = require('React');
  reactMock.StrictMode = function StrictMode() {}; // named shallow mock
  return reactMock;
});

describe('app/App', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<App />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
