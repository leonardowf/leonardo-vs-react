import React, { Component } from 'react'
import { connect } from 'react-redux'
import { actions as recipePricesActions } from '../../redux/modules/recipePrice'
import PriceRow from './PriceRow'

class CategorySizePriceList extends Component {
  constructor(props) {
    super(props)

    this.recipePricesRows = this.recipePricesRows.bind(this)
    this.onSubmitRecipePrice = this.onSubmitRecipePrice.bind(this)
  }

  componentWillMount () {
    this.props.fetchRecipePrices()
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.dirty) {
      this.props.fetchRecipePrices()
      this.props.resetDirty()
    }
  }

  onSubmitRecipePrice (recipePrice) {
    this.props.updateRecipePrice(recipePrice)
  }

  recipePricesRows () {
    return this.props.recipePrices.map
    (
      (recipePrice) => (
        <PriceRow
          key={recipePrice.id}
          recipePrice={recipePrice}
          onSubmitRecipePrice={this.onSubmitRecipePrice}
        />
      )
    )
  }

  recipePriceRow(recipePrice) {
    return (
      <tr>
        <td>
          {recipePrice.recipeCategoryName}
        </td>
        <td>
          {recipePrice.recipeSizeName}
        </td>
      </tr>
    )
  }

  render () {
    return (
      <div className='sizes-container'>
        <h1>Categorias x Tamanho e Preço</h1>
        <p>Crie os tamanhos personalizados da sua pizzaria.</p>
        <div className='table-container'>
          <table>
            <tbody>
              {this.recipePricesRows()}
            </tbody>
          </table>
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    dirty: state.recipePrice.dirty,
    recipePrices: state.recipePrice.all
  }
}

export default connect(mapStateToProps, recipePricesActions)(CategorySizePriceList)
