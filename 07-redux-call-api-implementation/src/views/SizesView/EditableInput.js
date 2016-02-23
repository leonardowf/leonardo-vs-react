import React, { Component, PropTypes } from 'react'

export default class EditableInput extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onSubmitForm: PropTypes.func.isRequired,
    onInputChange: PropTypes.func.isRequired,
    onEscPress: PropTypes.func.isRequired,
    autoFocus: PropTypes.bool
  };

  constructor (props) {
    super(props)

    this.state = {
      value: this.props.value
    }

    this.beforeChangeValue = this.props.value

    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormKeyPress = this.onFormKeyPress.bind(this)
  }

  onSubmitForm (event) {
    event.preventDefault()

    this.props.onSubmitForm(this.state.value)
  }

  onInputChange (event) {
    this.setState({value: event.target.value})
    this.props.onInputChange(event.target.value)
  }

  onFormKeyPress (event) {
    const escKeyCode = 27

    if (event.keyCode === escKeyCode) {
      this.setState({
        isEditing: false,
        value: this.beforeChangeValue
      })

      this.props.onInputChange(this.beforeChangeValue)
      this.props.onEscPress()
    }
  }

  render () {
    return (
      <form onSubmit={this.onSubmitForm}>
        <input
          value={this.state.value}
          onChange={this.onInputChange}
          onKeyDown={this.onFormKeyPress}
          className='editable-row'
          type='text'
          autoFocus={this.props.autoFocus}
        >
        </input>
      </form>
    )
  }
}
