class AdjustPriceHelper {
  constructor (prices, operation, type) {
    this.prices = prices
    this.operation = operation
    this.type = type
  }

  execute (inputValue) {
    if (this.operation === '+' && this.type === '%') {
      this.addPercent(inputValue)
    } else if (this.operation === '+' && this.type === '$') {
      this.addValue(inputValue)
    } else if (this.operation === '-' && this.type === '%') {
      this.subtractPercent(inputValue)
    } else if (this.operation === '-' && this.type === '$') {
      this.subtractValue(inputValue)
    }
  }

  addPercent (percent) {
    for (var recipePrice of this.prices) {
      const intValue = parseInt(percent)
      recipePrice.price = parseInt(recipePrice.price * (1.0 + intValue / 100.0))
    }
  }

  addValue (value) {
    for (var recipePrice of this.prices) {
      const intValue = parseInt(value)
      recipePrice.price = recipePrice.price + intValue
    }
  }

  subtractPercent (percent) {
    for (var recipePrice of this.prices) {
      const intValue = parseInt(percent)
      recipePrice.price = parseInt(recipePrice.price * (1.0 - intValue / 100.0))
    }

    if (recipePrice.price < 0) {
      recipePrice.price = 0
    }
  }

  subtractValue (value) {
    for (var recipePrice of this.prices) {
      const intValue = parseInt(value)
      recipePrice.price = recipePrice.price - intValue

      if (recipePrice.price < 0) {
        recipePrice.price = 0
      }
    }
  }
}

export default AdjustPriceHelper
