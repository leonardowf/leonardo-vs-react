import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'

import { actions as loginActions } from '../../redux/modules/login'

class SignupTabForm extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired
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

  onSubmitSignup (signupProps) {
    this.props.signup(signupProps)
  }

  render () {
    const {fields: {name, email, password}, handleSubmit} = this.props
    return (
      <li className='tab-header-and-content'>
        <a href='#' className={this.tabClass()} onClick={this.props.onClick}>
          Cadastre-se
        </a>
        <div className={this.tabContentClass()}>
          <form onSubmit={handleSubmit(this.onSubmitSignup.bind(this))}>
            <input type='text' placeholder='Nome da pizzaria' {...name}>
            </input>

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
  form: 'SignupTabForm',                           // a unique name for this form
  fields: ['name', 'email', 'password'] // all the fields in your form
}, null, loginActions)(SignupTabForm)
