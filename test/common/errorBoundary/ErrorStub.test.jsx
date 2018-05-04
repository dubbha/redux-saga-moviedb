import React from 'react';
import { shallow } from 'enzyme';
import { ErrorStub } from 'common/errorBoundary';

describe('ErrorStub', () => {
  it('should throw on mount', () => {
    // Wrap in a function, otherwise the error will not be caught and the assertion will fail
    const wrapFn = () => shallow(<ErrorStub />);

    expect(wrapFn).toThrow();
  });
});
