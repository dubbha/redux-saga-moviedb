import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import './style.sass';

export default class ErrorBoundary extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      info: null,
      detailsHidden: true,
    };
  }

  componentDidCatch(error, info) {
    this.setState({
      hasError: true,
      error,
      info,
    });
  }

  handleDetailsClick = () => {
    const prevDetailsHidden = this.state.detailsHidden;
    this.setState({ detailsHidden: !prevDetailsHidden });
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="errorBoundary">
          <div>
            Error [
            <a
              role="link"
              tabIndex={0}
              className="errorBoundary__link"
              onClick={this.handleDetailsClick}
            >
              details
            </a>
            ]
          </div>
          <div
            className={classNames(
              'errorBoundary__details',
              { errorBoundary__details_hidden: this.state.detailsHidden },
            )}
          >
            <div>{this.state.error.toString()}</div>
            <div>{this.state.info.componentStack.split('\n').map(item => (<div key={item}>{item}</div>))}</div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
