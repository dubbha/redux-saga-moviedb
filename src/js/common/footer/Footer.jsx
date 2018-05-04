import React from 'react';
import Logo from '../logo';
import ErrorBoundary from '../errorBoundary';
import './style.sass';

const Footer = () => (
  <footer className="footer">
    <ErrorBoundary>
      <Logo />
    </ErrorBoundary>
  </footer>
);

export default Footer;
