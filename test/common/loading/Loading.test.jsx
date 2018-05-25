import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Loading from 'common/loading/Loading';

describe('Spinner', () => {
  it('should render successfully', () => {
    const wrapper = shallow(<Loading />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
