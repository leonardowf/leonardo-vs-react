import React, { PropTypes, Component } from 'react'
import ButtonGroup from './ButtonGroup'
import SimpleCurrencyInput from 'react-simple-currency'
import AdjustPriceHelper from '../../helpers/AdjustPriceHelper'
import NumberInput from './NumberInput'

export default class ReadjustPriceView extends Component {
  static propTypes = {
    recipePrices: PropTypes.array.isRequired,
    onApply: PropTypes.func.isRequired
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
      selectedAdjustPriceButton: this.adjustPriceButtons[0],
      selectedAdjustPriceMode: this.adjustPriceModes[0],
      inputValue: 0
    }

    this.onAdjustPriceButtonSelected = this.onAdjustPriceButtonSelected.bind(this)
    this.onAdjustPriceModeSelected = this.onAdjustPriceModeSelected.bind(this)
    this.onSubmitAdjustPrice = this.onSubmitAdjustPrice.bind(this)
    this.adjustPriceInput = this.adjustPriceInput.bind(this)
    this.onCurrencyInputChange = this.onCurrencyInputChange.bind(this)
    this.onPercentValueChange = this.onPercentValueChange.bind(this)
  }

  onAdjustPriceButtonSelected (button) {
    this.setState({
      selectedAdjustPriceButton: button
    })
  }

  onAdjustPriceModeSelected (button) {
    this.setState({
      selectedAdjustPriceMode: button
    })
  }

  onSubmitAdjustPrice (event) {
    event.preventDefault()
    const recipePrices = this.props.recipePrices
    const type = this.state.selectedAdjustPriceButton.type
    const mode = this.state.selectedAdjustPriceMode.type
    const adjustPriceHelper = new AdjustPriceHelper(recipePrices, type, mode)

    adjustPriceHelper.execute(this.state.inputValue)
    this.props.onApply()
  }

  onCurrencyInputChange (rawValue, displayValue) {
    this.setState({
      inputValue: rawValue
    })
  }

  onPercentValueChange (rawValue) {
    this.setState({
      inputValue: rawValue
    })
  }

  adjustPriceInput () {
    if (this.state.selectedAdjustPriceMode.type === '%') {
      return <NumberInput value={this.state.inputValue} onChange={this.onPercentValueChange}/>
    } else {
      return <SimpleCurrencyInput
        unit='R$'
        separator=','
        delimiter='.'
        value={this.state.inputValue}
        onInputChange={this.onCurrencyInputChange}
        />
    }
  }

  render () {
    return (
      <div>
        <div className='button-group-container'>
          <form onSubmit={this.onSubmitAdjustPrice}>
            <ButtonGroup
              buttons={this.adjustPriceButtons}
              selected={this.state.selectedAdjustPriceButton}
              onChange={this.onAdjustPriceButtonSelected}
              name='adjust-price-button'
              />

            <div id='adjust-price-input'>
              {this.adjustPriceInput()}
            </div>

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
    )
  }
}
