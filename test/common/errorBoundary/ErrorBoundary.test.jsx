import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import ErrorBoundary from 'common/errorBoundary';

describe('ErrorBoudnary', () => {
  it('should render children successfully by default', () => {
    const wrapper = shallow(<ErrorBoundary><div>children</div></ErrorBoundary>);

    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('should update local state hasError flag on componentDidCatch', () => {
    const wrapper = shallow(<ErrorBoundary><div>children</div></ErrorBoundary>);

    wrapper.instance().componentDidCatch('ERROR', { componentStack: 'last\nmid\nfirst' });

    expect(wrapper.state('hasError')).toBe(true);
  });

  it('should update local state error on componentDidCatch', () => {
    const wrapper = shallow(<ErrorBoundary><div>children</div></ErrorBoundary>);

    wrapper.instance().componentDidCatch('ERROR', { componentStack: 'last\nmid\nfirst' });

    expect(wrapper.state('error')).toBe('ERROR');
  });

  it('should update local state info on componentDidCatch', () => {
    const wrapper = shallow(<ErrorBoundary><div>children</div></ErrorBoundary>);

    wrapper.instance().componentDidCatch('ERROR', { componentStack: 'last\nmid\nfirst' });

    expect(wrapper.state('info')).toEqual({ componentStack: 'last\nmid\nfirst' });
  });

  it('should render error block when error caught', () => {
    const wrapper = shallow(<ErrorBoundary><div>children</div></ErrorBoundary>);

    wrapper.setState({
      hasError: true,
      error: 'ERROR',
      info: { componentStack: 'last\nmid\nfirst' },
    });

    expect(toJson(wrapper.render())).toMatchSnapshot();
  });

  it('should expand error stack details on click', () => {
    const wrapper = shallow(<ErrorBoundary><div>children</div></ErrorBoundary>);

    wrapper.setState({
      hasError: true,
      error: 'ERROR',
      info: { componentStack: 'last\nmid\nfirst' },
    });

    wrapper.find('a').simulate('click');

    expect(wrapper.state('detailsHidden')).toBe(false);
  });
});
