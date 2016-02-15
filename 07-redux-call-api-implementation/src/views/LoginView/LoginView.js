import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import LoginTabForm from './LoginTabForm'
import SignupTabForm from './SignupTabForm'

const LOGIN_TAB = 'LOGIN_TAB'
const SIGNUP_TAB = 'SIGNUP_TAB'

class LoginView extends Component {
  static propTypes = {
    push: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {activeTab: LOGIN_TAB}
  }

  isActive (tabType) {
    return tabType === this.state.activeTab
  }

  onSelectTab (tabType) {
    this.setState({activeTab: tabType})
  }

  componentWillReceiveProps (newProps) {
    if (newProps.login.token && newProps.login.email) {
      this.props.push('/home')
    }
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

function mapStateToProps ({login}) {
  return { login }
}

export default connect(mapStateToProps, routeActions)(LoginView)
