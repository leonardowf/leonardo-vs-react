import React, { Component, PropTypes } from 'react'
import SimpleCurrencyInput from 'react-simple-currency'
import FontAwesome from 'react-fontawesome'
import CentsFormatter from '../../helpers/CentsFormatter'

class PriceRow extends Component {
  constructor(props) {
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
    console.log(payload)
    payload.price = rawValue
  }

  toggleEditing () {
    this.setState({
      isEditing: !this.state.isEditing
    })
  }

  onSubmitForm (event, recipePrice) {
    event.preventDefault()
    this.setState({
      isEditing: false
    })

    this.props.onSubmitRecipePrice(recipePrice)
  }

  priceDisplay(recipePrice) {
      return (
        <form className='price-form' onSubmit={(event) => (this.onSubmitForm(event, recipePrice))}>
          <SimpleCurrencyInput
            unit='R$'
            separator=','
            delimiter='.'
            value={recipePrice.price}
            onInputChange={(rawValue, displayValue) => this.onCurrencyInputChange(rawValue, displayValue, recipePrice)}
          />
        </form>
      )
  }

  render() {
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
