import React, { PropTypes, Component } from 'react'
import FontAwesome from 'react-fontawesome'

export default class MenuItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    isSelected: PropTypes.bool.isRequired
  };

  menuItemClassName () {
    return this.props.isSelected ? 'menu-item active' : 'menu-item'
  }

  render () {
    console.log(this.props)

    return (
      <div className={this.menuItemClassName()}>
        <div className='image-container'>
          <FontAwesome name={this.props.image} size='3x' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
        </div>
        <div className='title-container'>
          <h4>{this.props.name}</h4>
        </div>
      </div>
    )
  }
}
