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
        <div className='tabs is-boxed'>
          <ul>
            <li className='is-active'><a><i className='fa fa-image'></i> Pictures</a></li>
            <li><a><i className='fa fa-music'></i> Music</a></li>
            <li><a><i className='fa fa-film'></i> Videos</a></li>
            <li><a><i className='fa fa-file-text-o'></i> Documents</a></li>
          </ul>
        </div>
        <div className='tab-content'>
          <div className='form-container-bla'>
            <form>
              <p className='control has-icon'>
                <input className='input' type='email' placeholder='Email'></input>
                <i className='fa fa-envelope'></i>
              </p>
              <p className='control has-icon'>
                <input className='input' type='password' placeholder='Password'></input>
                <i className='fa fa-lock'></i>
              </p>
              <p className='control'>
                <button className='button is-success'>
                  Login
                </button>
              </p>
            </form>
          </div>
        </div>


        {/*<ul className='accordion-tabs-minimal'>
          <LoginTabForm
            isSelected={this.isActive(LOGIN_TAB)}
            onClick={() => { this.onSelectTab(LOGIN_TAB) }}
          />
          <SignupTabForm
            isSelected={this.isActive(SIGNUP_TAB)}
            onClick={() => { this.onSelectTab(SIGNUP_TAB) }}
          />
        </ul>*/}
      </div>
    )
  }
}

function mapStateToProps ({login}) {
  return { login }
}

export default connect(mapStateToProps, routeActions)(LoginView)
