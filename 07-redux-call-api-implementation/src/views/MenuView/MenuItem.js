import React, { PropTypes, Component } from 'react'
import FontAwesome from 'react-fontawesome'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { changeToMenu } from '../../redux/modules/leftMenu.js'

class MenuItem extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    menuValue: PropTypes.object.isRequired
  };

  isSelected() {
    return this.props.current === this.props.menuValue.value
  }

  menuItemClassName () {
    return this.isSelected() ? 'menu-item active' : 'menu-item'
  }

  onClickMenu() {
    this.props.changeToMenu(this.props.menuValue)
    const { router } = this.props.menuValue
    this.props.push(router)
  }

  render () {
    return (
      <div onClick={() => {this.onClickMenu()}} className={this.menuItemClassName()}>
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

const mapStateToProps = (state) => ({
  current: state.leftMenu.current
})

export default connect(mapStateToProps, {changeToMenu, push: routeActions.push}, null)(MenuItem)
