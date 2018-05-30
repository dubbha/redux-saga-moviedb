import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Logo from 'common/logo';

describe('Logo', () => {
  const props = { onSearchClick: jest.fn() };

  it('should render successfully', () => {
    const wrapper = shallow(<Logo {...props} />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should never update', () => {
    const instance = new Logo(props);
    expect(instance.shouldComponentUpdate()).toBe(false);
  });
});
