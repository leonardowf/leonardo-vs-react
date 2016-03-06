import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as recipePricesActions } from '../../redux/modules/recipePrice'
import PriceRow from './PriceRow'
import ReadjustPriceView from './ReadjustPriceView'

class CategorySizePriceList extends Component {
  static propTypes = {
    fetchRecipePrices: PropTypes.func.isRequired,
    resetDirty: PropTypes.func.isRequired,
    updateRecipePrice: PropTypes.func.isRequired,
    setAsDirty: PropTypes.func.isRequired,
    recipePrices: PropTypes.array.isRequired

  };

  constructor (props) {
    super(props)

    this.recipePricesRows = this.recipePricesRows.bind(this)
    this.onSubmitRecipePrice = this.onSubmitRecipePrice.bind(this)
    this.onClickDiscardChanges = this.onClickDiscardChanges.bind(this)
    this.onNewPricesApplied = this.onNewPricesApplied.bind(this)
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
    return this.props.recipePrices.map(
      (recipePrice) => (
        <PriceRow
          key={recipePrice.id}
          recipePrice={recipePrice}
          onSubmitRecipePrice={this.onSubmitRecipePrice}
          />
      )
    )
  }

  recipePriceRow (recipePrice) {
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

  onClickDiscardChanges () {
    this.props.setAsDirty()
  }

  onNewPricesApplied () {
    this.forceUpdate()
  }

  render () {
    return (
      <div className='sizes-container'>
        <h1>Categorias x Tamanho e Preço</h1>
        <p>Crie os tamanhos personalizados da sua pizzaria.</p>

        <ReadjustPriceView
          recipePrices={this.props.recipePrices}
          onApply={this.onNewPricesApplied}
          />

        <div className='table-container'>
          <table>
            <tbody>
              {this.recipePricesRows()}
            </tbody>
          </table>
        </div>

        <div className='control-container'>
          <button onClick={this.onClickDiscardChanges} className='button-discard-changes'>Descartar alterações</button>
          <button className='button-save-changes'>Salvar alterações</button>
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
