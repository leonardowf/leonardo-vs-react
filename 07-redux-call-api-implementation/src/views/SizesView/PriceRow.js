import React, { Component, PropTypes } from 'react'
import SimpleCurrencyInput from 'react-simple-currency'
import CentsFormatter from '../../helpers/CentsFormatter'

class PriceRow extends Component {
  static propTypes = {
    recipePrice: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      isEditing: false
    }

    this.toggleEditing = this.toggleEditing.bind(this)
    this.priceDisplay = this.priceDisplay.bind(this)
    this.onSubmitForm = this.onSubmitForm.bind(this)
    this.centsFormatter = new CentsFormatter('.', 2, ',', 'R$')
  }

  onCurrencyInputChange (rawValue, displayValue, payload) {
    payload.price = rawValue
    this.forceUpdate()
  }

  toggleEditing () {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  componentWillReceiveProps (nextProps) {
  }

  onSubmitForm (event, recipePrice) {
    event.preventDefault()
  }

  priceDisplay (recipePrice) {
    return (
      <form className='price-form' onSubmit={(event) => (this.onSubmitForm(event, recipePrice))}>
        <SimpleCurrencyInput
          key={recipePrice.id}
          unit='R$'
          separator=','
          delimiter='.'
          value={recipePrice.price}
          onInputChange={(rawValue, displayValue) => this.onCurrencyInputChange(rawValue, displayValue, recipePrice)}
          />
      </form>
    )
  }

  render () {
    const recipePrice = this.props.recipePrice

    return (
      <tr>
        <td>
          {recipePrice.recipeCategoryName}
        </td>
        <td>
          {recipePrice.recipeSizeName}
        </td>
        <td>
          {this.priceDisplay(recipePrice)}
        </td>
      </tr>
    )
  }
}

export default PriceRow
