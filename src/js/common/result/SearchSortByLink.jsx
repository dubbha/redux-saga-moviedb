import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SearchSortByLink extends Component {
  static defaultProps = {
    isActive: false,
    onClickWithText: null,
  };

  static propTypes = {
    text: PropTypes.string.isRequired,
    isActive: PropTypes.bool,
    onClickWithText: PropTypes.func,
  };

  handleClick = () => {
    const { onClickWithText, text } = this.props;

    if (onClickWithText) {
      onClickWithText(text);
    }
  }

  render() {
    const {
      text,
      isActive,
    } = this.props;

    return (
      <a
        role="link"
        tabIndex={0}
        className={classNames(
          'searchResult__link',
          { searchResult__link_active: isActive },
        )}
        onClick={this.handleClick}
      >
        {`${text}`}
      </a>
    );
  }
}
