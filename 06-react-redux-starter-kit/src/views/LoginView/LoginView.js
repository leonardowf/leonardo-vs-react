import React, { Component } from 'react'

import LoginTabForm from './LoginTabForm'
import SignupTabForm from './SignupTabForm'

const LOGIN_TAB = 'LOGIN_TAB'
const SIGNUP_TAB = 'SIGNUP_TAB'

class LoginView extends Component {
  constructor (props) {
    super(props)

    this.state = {activeTab: LOGIN_TAB}
  }

  isActive (tabType) {
    return tabType === this.state.activeTab
  }

  tabClass (tabType) {
    if (this.isActive(tabType)) {
      return 'tab-link is-active'
    }

    return 'tab-link'
  }

  tabContentClass (tabType) {
    if (this.isActive(tabType)) {
      return 'tab-content is-open'
    }

    return 'tab-content'
  }

  onSubmitLogin (loginProps) {
    console.log(loginProps)
  }

  onSelectTab (tabType) {
    this.setState({activeTab: tabType})
  }

  render () {
    return (
      <div className='box'>
        <ul className='accordion-tabs-minimal'>
          <LoginTabForm
            isSelected={this.isActive(LOGIN_TAB)}
            onClick={() => { this.onSelectTab(LOGIN_TAB) }}
          />
          <SignupTabForm
            isSelected={this.isActive(SIGNUP_TAB)}
            onClick={() => { this.onSelectTab(SIGNUP_TAB) }}
          />
        </ul>
      </div>
    )
  }
}

export default LoginView
