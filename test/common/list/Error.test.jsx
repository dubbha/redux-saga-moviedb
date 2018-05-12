import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Error from 'common/list/Error';

describe('Error', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<Error />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
