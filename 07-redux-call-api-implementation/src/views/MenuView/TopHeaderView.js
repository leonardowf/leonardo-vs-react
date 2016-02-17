import React, { Component } from 'react'

export default class TopHeaderView extends Component {

  onClickLogout (event) {
    event.preventDefault()
    
  }

  render () {
    return (
      <header className='navigation' role='banner'>
        <div className='navigation-wrapper'>
          <a href='javascript:void(0)' className='logo'>
            <img src='https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png' alt='Logo Image'></img>
          </a>
          <a href='javascript:void(0)' className='navigation-menu-button' id='js-mobile-menu'>MENU</a>

          <div className='navigation-tools'>
            <nav role='navigation'>
              <ul id='js-navigation-menu' className='navigation-menu show'>
                <li className='nav-link more'><a href='javascript:void(0)'>More</a>
                  <ul className='submenu'>
                    <li><a onClick={this.onClickLogout}>Logout</a></li>
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
