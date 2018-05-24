import React, { Component } from 'react';
import './style.sass';

export default class Logo extends Component {
  shouldComponentUpdate() {
    return false; // no props to listen to
  }

  render() {
    return (
      <div className="logo">
        themoviedb
      </div>
    );
  }
}
