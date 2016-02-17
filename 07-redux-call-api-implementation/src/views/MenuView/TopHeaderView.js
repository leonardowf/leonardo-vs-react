import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'
import { actions as loginActions } from '../../redux/modules/login'

class TopHeaderView extends Component {
  static propTypes = {
    logout: PropTypes.func.isRequired,
    push: PropTypes.func.isRequired
  };

  onClickLogout (event) {
    this.props.logout()
    this.props.push('/')
  }

  render () {
    return (
      <header className='navigation' role='banner'>
        <div className='navigation-wrapper'>
          <a href='javascript:void(0)' className='logo'>
            {/* Logo goes here */}
          </a>
          <a href='javascript:void(0)' className='navigation-menu-button' id='js-mobile-menu'>MENU</a>

          <div className='navigation-tools'>
            <nav role='navigation'>
              <ul id='js-navigation-menu' className='navigation-menu show'>
                <li className='nav-link more'><a href='javascript:void(0)'>More</a>
                  <ul className='submenu'>
                    <li><a onClick={() => this.onClickLogout()}>Logout</a></li>
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>
    )
  }
}

export default connect(null, { logout: loginActions.logout, push: routeActions.push })(TopHeaderView)
