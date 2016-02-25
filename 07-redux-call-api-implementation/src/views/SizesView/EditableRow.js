import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import EditableInput from './EditableInput'
import { connect } from 'react-redux'
import { actions as recipeSizesActions } from '../../redux/modules/recipeSize'

class EditableRow extends Component {
  static propTypes = {
    allowRemoval: PropTypes.bool,
    payload: PropTypes.object.isRequired,
    name: PropTypes.string.isRequired,
    description: PropTypes.number,
    updateRecipeSize: PropTypes.func.isRequired,
    deleteRecipeSize: PropTypes.func.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      isEditing: false,
      name: this.props.name,
      description: this.props.description
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
    this.allowRemoval = this.allowRemoval.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      name: nextProps.name,
      description: nextProps.description
    })
  }

  toggleEditing () {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  onDeleteClick () {
    this.props.deleteRecipeSize(this.props.payload)
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

    this.props.updateRecipeSize(this.props.payload, this.state.name, this.state.description)
  }

  onSubmitFormDescription (description) {
    this.setState({
      isEditing: false
    })

    this.props.updateRecipeSize(this.props.payload, this.state.name, this.state.description)
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
            value={this.state.description ? `${this.state.description}` : ''}
            onSubmitForm={this.onSubmitFormDescription}
            onInputChange={this.onInputChangeDescription}
            onEscPress={this.onEscPress}
            type='number'
          />
        </td>
      )
    }

    return <td>{this.state.description ? `${this.state.description}` : ''}</td>
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
        {this.displayDescription()}
        <td>
          <FontAwesome name='pencil' style={{marginRight: '10px', cursor: 'pointer'}} onClick={this.toggleEditing} />
          {this.allowRemoval()}
        </td>
      </tr>
    )
  }
}

const mapStateToProps = (state) => {
  return {banana: 'banna'}
}

export default connect(mapStateToProps, recipeSizesActions)(EditableRow)
