import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchSortByLink from 'common/result/SearchSortByLink';

describe('SearchSortByLink', () => {
  let props;

  beforeEach(() => {
    props = {
      text: 'TEXT',
      active: false,
      onClickWithText: jest.fn(),
    };
  });

  it('should render successfully', () => {
    const wrapper = shallow(<SearchSortByLink {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render active class for the active link', () => {
    const wrapper = shallow(<SearchSortByLink {...props} isActive />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should handle click if on click function is passed', () => {
    const wrapper = shallow(<SearchSortByLink {...props} />);

    wrapper.find('a').simulate('click');

    expect(props.onClickWithText).toBeCalled();
  });

  it('should silently ignore the click otherwise', () => {
    props.onClickWithText = null;
    const wrapper = shallow(<SearchSortByLink {...props} />);

    // Wrap in a function, otherwise the error will not be caught and the assertion will fail
    const wrapFn = () => wrapper.find('a').simulate('click');

    expect(wrapFn).not.toThrow();
  });
});
