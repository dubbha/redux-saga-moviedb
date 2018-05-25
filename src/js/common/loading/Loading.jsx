import React from 'react';
import Spinner from './Spinner';
import './style.sass';

const Loading = () => (
  <div className="loading">
    <Spinner />
  </div>
);

export default Loading;
