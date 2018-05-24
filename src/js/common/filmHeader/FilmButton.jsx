import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class FilmButton extends Component {
  static propTypes = {
    onSearchClick: PropTypes.func.isRequired,
  };

  shouldComponentUpdate() {
    return false; // onSearchClick should never change
  }

  render() {
    const { onSearchClick } = this.props;

    return (
      <button
        type="button"
        className="film__button"
        onClick={onSearchClick}
      >
        Search
      </button>
    );
  }
}
