import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as recipePricesActions } from '../../redux/modules/recipePrice'
import PriceRow from './PriceRow'
import ButtonGroup from './ButtonGroup'

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

    this.adjustPriceButtons = [
      {
        type: '+',
        name: 'Adicionar'
      },
      {
        type: '-',
        name: 'Subtrair'
      }
    ]

    this.adjustPriceModes = [
      {
        type: '%',
        name: '%'
      },
      {
        type: '$',
        name: 'R$'
      }
    ]

    this.state = {
      selectedAdjustPriceButton: this.adjustPriceButtons[1],
      selectedAdjustPriceMode: this.adjustPriceModes[0]
    }

    this.recipePricesRows = this.recipePricesRows.bind(this)
    this.onSubmitRecipePrice = this.onSubmitRecipePrice.bind(this)
    this.onClickDiscardChanges = this.onClickDiscardChanges.bind(this)
    this.onAdjustPriceButtonSelected = this.onAdjustPriceButtonSelected.bind(this)
    this.onAdjustPriceModeSelected = this.onAdjustPriceModeSelected.bind(this)
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

  onAdjustPriceButtonSelected(button) {
    this.setState({
      selectedAdjustPriceButton: button
    })
  }

  onAdjustPriceModeSelected(button) {
    this.setState({
      selectedAdjustPriceMode: button
    })
  }

  render () {
    return (
      <div className='sizes-container'>
        <h1>Categorias x Tamanho e Preço</h1>
        <p>Crie os tamanhos personalizados da sua pizzaria.</p>

        <div>
          <div className='button-group-container'>
            <form>
              <ButtonGroup
                buttons={this.adjustPriceButtons}
                selected={this.state.selectedAdjustPriceButton}
                onChange={this.onAdjustPriceButtonSelected}
                name='adjust-price-button'
                />

                <input id='adjust-price'></input>

                <div className='adjust-price-mode'>
                  <ButtonGroup
                    buttons={this.adjustPriceModes}
                    selected={this.state.selectedAdjustPriceMode}
                    onChange={this.onAdjustPriceModeSelected}
                    name='adjust-price-mode'
                    />
                </div>

                <button id='adjust-price'>Aplicar</button>
            </form>


          </div>

        </div>

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
