import React, { Component, PropTypes } from 'react'
import { reduxForm } from 'redux-form'
import validator from 'email-validator'
import { actions as loginActions } from '../../redux/modules/login'
import LittleFlashError from '../../components/LittleFlashError'

class LoginTabForm extends Component {
  static propTypes = {
    isSelected: PropTypes.bool.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    fields: PropTypes.object.isRequired,
    onClick: PropTypes.func.isRequired,
    login: PropTypes.func.isRequired,
    loginErrors: PropTypes.array.isRequired,
    resetLoginErrors: PropTypes.func.isRequired,
    isLoading: PropTypes.bool.isRequired
  };

  tabClass () {
    if (this.props.isSelected) {
      return 'tab-link is-active first'
    }
    return 'tab-link first'
  }

  tabContentClass () {
    if (this.props.isSelected) {
      return 'tab-content is-open'
    }

    return 'tab-content'
  }

  fieldEmailClass (emailField) {
    return ''

    // if (emailField.invalid && emailField.touched) {
    //   return 'invalid'
    // }
    //
    // return ''
  }

  fieldPasswordClass (passwordField) {
    return ''
    // if (passwordField.invalid && passwordField.touched) {
    //   return 'invalid'
    // }
    //
    // return ''
  }

  fieldEmailErrorMessage (emailField) {
    if (emailField.invalid && emailField.value !== null && emailField.value === '' && !emailField.touched) {
      return ''
    }

    if (emailField.invalid && emailField.touched) {
      return emailField.error
    }

    return ''
  }

  fieldPasswordErrorMessage (passwordField) {
    if (passwordField.invalid && passwordField.touched) {
      return passwordField.error
    }

    return ''
  }

  loginError () {
    var resultError = ''

    if (!this.props.loginErrors || this.props.loginErrors.length === 0) {
      return null
    }

    for (var error of this.props.loginErrors) {
      resultError = resultError + '\n' + error
    }

    return <LittleFlashError message={resultError} onClick={() => this.onClickLoginError()} />
  }

  onClickLoginError () {
    this.props.resetLoginErrors()
  }

  onSubmitLogin (loginProps) {
    this.props.login(loginProps)
  }

  render () {
    const {fields: {email, password}, handleSubmit} = this.props

    return (
      <li className='tab-header-and-content'>
        <a href='#' className={this.tabClass()} onClick={this.props.onClick}>
          Login
        </a>
        <div className={this.tabContentClass()}>
          {this.loginError()}
          <div className='login-form-container'>
            <form onSubmit={handleSubmit(this.onSubmitLogin.bind(this))}>
              <div>{this.fieldEmailErrorMessage(email)}</div>
              <input autoFocus className={this.fieldEmailClass(email)} type='text' placeholder='E-mail' {...email}>
              </input>

              <div className='password-error'>{this.fieldPasswordErrorMessage(password)}</div>
              <input className={this.fieldPasswordClass(password)} type='password' placeholder='Senha' {...password}>
              </input>

              <button type='submit' className={this.props.isLoading ? 'is-disabled' : ''}>Entrar</button>
            </form>
          </div>
        </div>
      </li>
    )
  }
}

const validate = (values) => {
  const errors = {}

  if (!values.email || values.email.length === 0) {
    errors.email = 'Digite um email :('
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
    isLoading: state.login.loading,
    loginErrors: state.login.loginErrors
  }
}

export default reduxForm({ // <----- THIS IS THE IMPORTANT PART!
  form: 'LoginTabForm',                           // a unique name for this form
  fields: ['email', 'password'], validate // all the fields in your form
}, mapStateToProps, loginActions)(LoginTabForm)
