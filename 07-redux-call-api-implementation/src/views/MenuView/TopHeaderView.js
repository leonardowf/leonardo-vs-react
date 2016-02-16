import React, { Component } from 'react'

export default class TopHeaderView extends Component {

  render () {
    const logo = 'https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_3_dark.png'

    return (
      <header className='navigation' role='banner'>
        <div className='navigation-wrapper'>
          <a href='javascript:void(0)' className='logo'>
            <img src='https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/placeholder_logo_1.png' alt='Logo Image'></img>
          </a>
          <a href='javascript:void(0)' className='navigation-menu-button' id='js-mobile-menu'>MENU</a>
          <nav role='navigation'>
            <ul id='js-navigation-menu' className='navigation-menu show'>
              <li className='nav-link'><a href='javascript:void(0)'>Products</a></li>
              <li className='nav-link'><a href='javascript:void(0)'>About Us</a></li>
              <li className='nav-link'><a href='javascript:void(0)'>Contact</a></li>
              <li className='nav-link more'><a href='javascript:void(0)'>More</a>
                <ul className='submenu'>
                  <li><a href='javascript:void(0)'>Submenu Item</a></li>
                  <li><a href='javascript:void(0)'>Another Item</a></li>
                  <li className='more'><a href='javascript:void(0)'>Item with submenu</a>
                    <ul className='submenu'>
                      <li><a href='javascript:void(0)'>Sub-submenu Item</a></li>
                      <li><a href='javascript:void(0)'>Another Item</a></li>
                    </ul>
                  </li>
                  <li className='more'><a href='javascript:void(0)'>Another submenu</a>
                    <ul className='submenu'>
                      <li><a href='javascript:void(0)'>Sub-submenu</a></li>
                      <li><a href='javascript:void(0)'>An Item</a></li>
                    </ul>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
          <div className='navigation-tools'>
            <div className='search-bar'>
              <form role='search'>
                <input type='search' placeholder='Enter Search' ></input>
                <button type='submit'>
                  <img src='https://raw.githubusercontent.com/thoughtbot/refills/master/source/images/search-icon.png' alt='Search Icon'></img>
                </button>
              </form>
            </div>
          </div>
        </div>
      </header>
    )
  }
}
