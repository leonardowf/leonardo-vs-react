import React, { PropTypes, Component } from 'react'

export default class MenuItem extends Component {
  static propTypes = {
    name: PropTypes.string.required,
    image: PropTypes.string.required
  };

  render () {
    return (
      <div className='menu-item'>
        <div className='image-container'>
          <img src={this.props.image} />
        </div>
        <div className='title-container'>
          <h4>{this.props.name}</h4>
        </div>
      </div>
    )
  }
}
