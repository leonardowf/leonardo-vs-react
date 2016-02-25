import React, { Component } from 'react'
import FontAwesome from 'react-fontawesome'
import EditableInput from './EditableInput'
import { connect } from 'react-redux'
import { actions as recipeSizesCategories } from '../../redux/modules/recipeCategory'

class RecipeCategoryEditableRow extends Component {
  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.name,
    }

    this.displayName = this.displayName.bind(this)
    this.onInputChangeName = this.onInputChangeName.bind(this)
    this.onSubmitFormName = this.onSubmitFormName.bind(this)
    this.toggleEditing = this.toggleEditing.bind(this)
    this.onDeleteClick = this.onDeleteClick.bind(this)
    this.onEscPress = this.onEscPress.bind(this)
    this.allowRemoval = this.allowRemoval.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      name: nextProps.name
    })
  }

  toggleEditing () {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  onDeleteClick () {
    this.props.deleteRecipeCategory(this.props.payload)
  }

  onInputChangeName (newName) {
    this.setState({
      name: newName
    })
  }

  onSubmitFormName (name) {
    this.setState({
      isEditing: false
    })

    this.props.updateRecipeCategory(this.props.payload, this.state.name)
  }

  onEscPress () {
    this.setState({
      isEditing: false
    })
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
            type='text'
          />
        </td>
      )
    }

    return <td>{this.state.name}</td>
  }

  allowRemoval () {
    if (this.props.allowRemoval) {
      return <FontAwesome name='trash' style={{marginRight: '10px', cursor: 'pointer'}} onClick={this.onDeleteClick} />
    }
    return null
  }

  render () {
    return (
      <tr>
        {this.displayName()}
        <td>
          <FontAwesome name='pencil' style={{marginRight: '10px', cursor: 'pointer'}} onClick={this.toggleEditing} />
          {this.allowRemoval()}
        </td>
      </tr>
    )
  }
}

export default connect(null, recipeSizesCategories)(RecipeCategoryEditableRow)
