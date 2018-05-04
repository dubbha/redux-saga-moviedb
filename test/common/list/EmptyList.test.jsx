import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import EmptyList from 'common/list/EmptyList';

describe('EmptyList', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<EmptyList />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
