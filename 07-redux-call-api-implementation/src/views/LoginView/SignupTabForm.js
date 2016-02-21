import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import validator from 'email-validator'

import { actions as loginActions } from '../../redux/modules/login'
import LittleFlashError from '../../components/LittleFlashError'

class SignupTabForm extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    resetSignupErrors: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    signup: PropTypes.func.isRequired,
    signupErrors: PropTypes.array.isRequired,
    isLoading: PropTypes.bool.isRequired
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

  requiredFieldErrorMessage (requiredField) {
    if (requiredField.invalid && requiredField.value !== null && requiredField.value === '' && !requiredField.touched) {
      return ''
    }

    if (requiredField.invalid && requiredField.touched) {
      return requiredField.error
    }

    return ''
  }

  signupError () {
    var resultError = ''

    if (!this.props.signupErrors || this.props.signupErrors.length === 0) {
      return null
    }

    for (var error of this.props.signupErrors) {
      resultError = resultError + '\n' + error
    }

    return <LittleFlashError message={resultError} onClick={() => this.onClickSignupError()} />
  }

  onClickSignupError () {
    this.props.resetSignupErrors()
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
          {this.signupError()}
          <div className='login-form-container'>
            <form onSubmit={handleSubmit(this.onSubmitSignup.bind(this))}>

              <div>{this.requiredFieldErrorMessage(name)}</div>
              <input type='text' placeholder='Nome da pizzaria' {...name}>
              </input>

              <div>{this.requiredFieldErrorMessage(email)}</div>
              <input type='text' placeholder='E-mail' {...email}>
              </input>

              <div>{this.requiredFieldErrorMessage(password)}</div>
              <input type='password' placeholder='Senha' {...password}>
              </input>

              <button className={this.props.isLoading ? 'is-disabled' : ''} type='submit'>Registrar</button>
            </form>
          </div>
        </div>
      </li>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.name || values.name.length === 0) {
    errors.name = 'Digite um nome'
  }

  if (values.email && !validator.validate(values.email)) {
    errors.email = 'Digite um email válido :('
  }

  if (!values.password) {
    errors.password = 'Digite uma senha :('
  }

  if (values.password && values.password.length < 6) {
    errors.password = 'A senha não pode ser menor do que 6 caracteres :('
  }

  return errors
}

function mapStateToProps (state) {
  return {
    signupErrors: state.login.signupErrors,
    isLoading: state.login.isLoading
  }
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'SignupTabForm',                           // a unique name for this form
  fields: ['name', 'email', 'password'], validate // all the fields in your form
}, mapStateToProps, loginActions)(SignupTabForm)
