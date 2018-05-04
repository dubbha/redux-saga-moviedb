import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import SearchButton from 'common/searchHeader/searchToolbar/SearchButton';

describe('SearchButton', () => {
  let props;

  beforeEach(() => {
    props = {
      text: 'TEXT',
    };
  });

  it('should render successfully with defaults', () => {
    const wrapper = shallow(<SearchButton {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should render successfully with passed values', () => {
    props = {
      ...props,
      type: 'submit',
      size: 'large',
      isActive: true,
      onClickWithText: jest.fn(),
    };
    const wrapper = shallow(<SearchButton {...props} />);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should handle click if on click function is passed', () => {
    props.onClickWithText = jest.fn();
    const wrapper = shallow(<SearchButton {...props} />);

    wrapper.find('button').simulate('click');

    expect(props.onClickWithText).toBeCalled();
  });

  it('should silently ignore the click otherwise', () => {
    const wrapper = shallow(<SearchButton {...props} />);

    // Wrap in a function, otherwise the error will not be caught and the assertion will fail
    const wrapFn = () => wrapper.find('button').simulate('click');

    expect(wrapFn).not.toThrow();
  });
});
