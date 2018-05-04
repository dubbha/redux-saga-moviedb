import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Logo from 'common/logo';

describe('Logo', () => {
  it('should render successfully', () => {
    const props = { onSearchClick: jest.fn() };
    const wrapper = shallow(<Logo {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
