import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

export default class AddValueForm extends Component {
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    placeholder: PropTypes.string.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      inputValue: ''
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.valid = this.valid.bind(this)
  }

  onSubmitForm (event) {
    event.preventDefault()
    this.props.onSubmitForm(this.state.inputValue)
    this.setState({inputValue: ''})
  }

  onInputChange (event) {
    this.setState({
      inputValue: event.target.value
    })
  }

  valid () {
    return this.state.inputValue.length > 0
  }

  render () {
    return (
      <div className='add-form-container'>
        <form className='add-form' onSubmit={this.onSubmitForm}>
          <input
            value={this.state.inputValue}
            type='search'
            placeholder={this.props.placeholder}
            onChange={this.onInputChange}
            />
          <button type='submit' className={this.valid() ? '' : 'is-disabled'}>
            <FontAwesome name='plus' size='lg' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
          </button>
        </form>
      </div>
    )
  }
}
