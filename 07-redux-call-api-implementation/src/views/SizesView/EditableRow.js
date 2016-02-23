import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import EditableInput from './EditableInput'

export default class EditableRow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      name: 'name',
      description: 'description'
    }

    this.displayName = this.displayName.bind(this)
    this.displayDescription = this.displayDescription.bind(this)
    this.onInputChangeName = this.onInputChangeName.bind(this)
    this.onInputChangeDescription = this.onInputChangeDescription.bind(this)
    this.onSubmitFormDescription = this.onSubmitFormDescription.bind(this)
    this.onSubmitFormName = this.onSubmitFormName.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onEscPress = this.onEscPress.bind(this)
  }

  toggleEditing () {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  onDeleteClick () {
    console.log('excluir')
  }

  onInputChangeName (newName) {
    this.setState({
      name: newName
    })
  }

  onInputChangeDescription (newDescription) {
    this.setState({
      description: newDescription
    })
  }

  onSubmitFormName (name) {
    this.setState({
      isEditing: false
    })
  }

  onSubmitFormDescription (description) {
    this.setState({
      isEditing: false
    })
  }

  onEscPress () {
    this.setState({
      isEditing: false
    })
  }

  displayDescription () {
    if (this.state.isEditing) {
      return (
        <td>
          <EditableInput
            value={this.state.description}
            onSubmitForm={this.onSubmitFormDescription}
            onInputChange={this.onInputChangeDescription}
            onEscPress={this.onEscPress}
          />
        </td>
      )
    }

    return <td>{this.state.description}</td>
  }

  displayName () {
    if (this.state.isEditing) {
      return (
        <td>
          <EditableInput
            value={this.state.name}
            onSubmitForm={this.onSubmitFormName}
            onInputChange={this.onInputChangeName}
            autoFocus
            onEscPress={this.onEscPress}
          />
        </td>
      )
    }

    return <td>{this.state.name}</td>
  }

  render () {
    return (
      <tr>
        {this.displayName()}
        {this.displayDescription()}
        <td>
          <FontAwesome name='pencil' style={{marginRight: '10px', cursor: 'pointer'}} onClick={this.toggleEditing} />
          <FontAwesome name='trash' style={{marginRight: '10px', cursor: 'pointer'}} onClick={this.onDeleteClick} />
        </td>
      </tr>
    )
  }
}
