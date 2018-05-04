import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Spinner from 'common/list/Spinner';

describe('Spinner', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<Spinner />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
