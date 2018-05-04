import { Component } from 'react';

/* ErrorStub can be used to test the ErrorBoundary, like so:

import ErrorBoundary, { ErrorStub } from '../errorBoundary';

const Footer = () => (
  <footer className="footer">
    <ErrorBoundary>
      <ErrorStub />
      <Logo />
    </ErrorBoundary>
  </footer>
);

*/

export default class ErrorStub extends Component {
  componentDidMount() {
    throw new Error('ERR');
  }

  render() {
    return null;
  }
}
