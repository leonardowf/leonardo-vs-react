import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'

export default class AddTwoValuesForm extends Component {
  static propTypes = {
    onSubmitForm: PropTypes.func.isRequired,
    placeholders: PropTypes.array.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      inputValue: ['', '']
    }

    this.onInputChange = this.onInputChange.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
  }

  onSubmitForm (event) {
    event.preventDefault()
    this.props.onSubmitForm(this.state.inputValue)
    this.setState({inputValue: ''})
  }

  onInputChange (event, index) {
    x = [...this.state.inputValue]
    x[index] = event.target.value

    this.setState({
      inputValue: x
    })
  }

  render () {
    return (
      <div className='add-form-container'>
        <form className='add-form' onSubmit={this.onSubmitForm}>
          {/*<input
            value={this.state.inputValue[0]}
            type='search'
            placeholder={this.props.placeholders[0]}
            onChange={(event) => this.onInputChange(event, 0)}
          />

          <input
            value={this.state.inputValue[1]}
            type='search'
            placeholder={this.props.placeholders[1]}
            onChange={(event) => this.onInputChange(event, 1)}
          />*/}
          <button type='submit'>
            <FontAwesome name='plus' size='lg' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
          </button>
        </form>
      </div>
    )
  }
}
