import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

export default class SearchButton extends PureComponent {
  static defaultProps = {
    type: 'button',
    size: 'small',
    isActive: false,
    onClickWithText: null,
  };

  static propTypes = {
    text: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['submit', 'button', 'reset']),
    size: PropTypes.string,
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
      type,
      size,
      isActive,
    } = this.props;

    return (
      <button // eslint-disable-line react/button-has-type
        type={type} // disabling because eslint doesn't understand the type in defaultProps
        className={classNames(
          'searchButton',
          {
            [`searchButton_${size}`]: true,
            searchButton_active: isActive,
          },
        )}
        onClick={this.handleClick}
      >
        {`${text}`}
      </button>
    );
  }
}
