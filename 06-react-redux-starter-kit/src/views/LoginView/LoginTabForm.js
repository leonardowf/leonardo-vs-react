import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

class LoginTabForm extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired
  };

  tabClass () {
    if (this.props.isSelected) {
      return 'tab-link is-active'
    }
    return 'tab-link'
  }

  tabContentClass () {
    if (this.props.isSelected) {
      return 'tab-content is-open'
    }

    return 'tab-content'
  }

  onSubmitLogin (loginProps) {
    console.log(loginProps)
  }

  render () {
    const {fields: {email, password}, handleSubmit} = this.props
    return (
      <li className='tab-header-and-content'>
        <a href='#' className={this.tabClass()} onClick={this.props.onClick}>
          Login
        </a>
        <div className={this.tabContentClass()}>
          <form onSubmit={handleSubmit(this.onSubmitLogin.bind(this))}>
            <input type='text' placeholder='E-mail' {...email}>
            </input>

            <input type='password' placeholder='Senha' {...password}>
            </input>

            <button type='submit'>Entrar</button>
          </form>
        </div>
      </li>
    )
  }
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'LoginTabForm',                           // a unique name for this form
  fields: ['email', 'password'] // all the fields in your form
})(LoginTabForm)
