import React, { Component, PropTypes } from 'react'

export default class LittleFlashError extends Component {
  static propTypes = {
    onClick: PropTypes.func.isRequired,
    message: PropTypes.string.isRequired
  };

  render () {
    return (
      <div onClick={this.props.onClick} className='login-alert'>
        <span>
          {this.props.message}
        </span>
        <i className='fa fa-times fa-lg'></i>
      </div>
    )
  }
}
