import React, { Component } from 'react'
import { reduxForm } from 'redux-form'

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

  onSubmitLogin(loginProps) {
    console.log(loginProps)
  }

  render () {
    const {fields: {email, password}, handleSubmit} = this.props

    return (
      <div className='box'>
        <ul className='accordion-tabs-minimal'>
          <li className='tab-header-and-content'>
            <a href='#' className={this.tabClass(LOGIN_TAB)} onClick={() => this.setState({activeTab: LOGIN_TAB})}>
              Login
            </a>
            <div className={this.tabContentClass(LOGIN_TAB)}>
              <form onSubmit={handleSubmit(this.onSubmitLogin.bind(this))}>
                <input type='text' placeholder='E-mail' {...email}>
                </input>

                <input type='password' placeholder='Senha' {...password}>
                </input>

                <button type='submit'>Entrar</button>
              </form>
            </div>
          </li>
          <li className='tab-header-and-content'>
            <a href='#' className={this.tabClass(SIGNUP_TAB)} onClick={() => this.setState({activeTab: SIGNUP_TAB})}>
              Registre-se
            </a>
            <div className={this.tabContentClass(SIGNUP_TAB)}>
              <form>
                <input type='text' placeholder='E-mail'>
                </input>

                <input type='text' placeholder='Nome da pizzaria'>
                </input>

                <input type='password' placeholder='Senha'>
                </input>

                <button type='submit'>Registrar</button>
              </form>
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

LoginView = reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'LoginViewForm',                           // a unique name for this form
  fields: ['email', 'password'] // all the fields in your form
})(LoginView)

export default LoginView
