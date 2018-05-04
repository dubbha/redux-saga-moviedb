import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Footer from 'common/footer';

describe('Footer', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<Footer />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
