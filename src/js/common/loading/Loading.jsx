import React from 'react';
import Spinner from './Spinner';
import './style.sass';

const Loading = () => (
  <section className="loading">
    <Spinner />
  </section>
);

export default Loading;
