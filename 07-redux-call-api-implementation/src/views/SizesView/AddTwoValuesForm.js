import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import isNumber from '../../helpers/isNumber'

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
    this.valid = this.valid.bind(this)
  }

  onSubmitForm (event) {
    event.preventDefault()

    if (!this.valid()) {
      return
    }

    this.props.onSubmitForm(this.state.inputValue[0], this.state.inputValue[1])
    this.setState({inputValue: ['', '']})
  }

  onInputChange (event, index) {
    if (index === 1 && event.target.value !== '' && !isNumber(event.target.value)) {
      return
    }

    let newInput = [...this.state.inputValue]
    newInput[index] = event.target.value

    this.setState({
      inputValue: newInput
    })
  }

  valid () {
    return this.state.inputValue[0].length > 0
  }

  render () {
    return (
      <div className='add-two-form-container'>
        <form className='add-form' onSubmit={this.onSubmitForm}>
          <input
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
            />
          <button type='submit' className={this.valid() ? '' : 'is-disabled'}>
            <FontAwesome name='plus' size='lg' style={{ textShadow: '0 1px 0 rgba(0, 0, 0, 0.1)' }} />
          </button>
        </form>
      </div>
    )
  }
}
