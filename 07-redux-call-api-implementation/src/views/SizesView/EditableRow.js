import React, { PropTypes, Component } from 'react';
import FontAwesome from 'react-fontawesome'
import Keypress from 'react-keypress'

export default class EditableRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isEditing: false,
      inputValue: 'this.props'
    }

    this.toggleEditing = this.toggleEditing.bind(this)
    this.displayValue = this.displayValue.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onInputChange = this.onInputChange.bind(this)
    this.onFormKeyPress = this.onFormKeyPress.bind(this)
  }

  toggleEditing() {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  onDeleteClick () {
    console.log('excluir')
  }

  onSubmitForm (event) {
    event.preventDefault()
    this.setState({
      isEditing: false
    })
  }

  onInputChange (event) {
    this.setState({inputValue: event.target.value})
  }

  onFormKeyPress (event) {
    const escKeyCode = 27
    console.log()

    if (event.keyCode === escKeyCode) {
      this.setState({
        isEditing: false
      })
    }
  }

  displayValue () {
    const escKeypress = Keypress(['esc'], this.cancelInput)

    if (this.state.isEditing) {
      return (
        <td>
          <form onSubmit={this.onSubmitForm}>
            <input
              value={this.state.inputValue}
              onChange={this.onInputChange}
              onKeyDown={this.onFormKeyPress}
              className='editable-row'
              autoFocus='true'
              type='text'>
            </input>
          </form>
        </td>
      )
    }

    return <td>{this.state.inputValue}</td>
  }

  render() {
    return (
      <tr>
        {this.displayValue()}
        <td>
          <FontAwesome name='pencil' style={{marginRight: '10px', cursor: 'pointer'}} onClick={this.toggleEditing} />
          <FontAwesome name='trash' style={{marginRight: '10px', cursor: 'pointer'}} onClick={this.onDeleteClick} />
        </td>
      </tr>
    )
  }
}
