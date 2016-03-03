class CentsFormatter {
  constructor (delimiter, precision, separator, unit) {
    this.unit = unit
    this.separator = separator
    this.delimiter = delimiter
    this.precision = precision
  }

  repeatZeroes (times) {
    let result = ''
    for (let i = 0; i < times; i++) {
      result += '0'
    }

    return result
  }

  format (cents) {
    const minChars = '00'.length + this.precision

    let result = `${cents}`

    if (result.length < minChars) {
      const leftZeroesToAdd = minChars - result.length
      result = `${this.repeatZeroes(leftZeroesToAdd)}${result}`
    }

    let beforeSeparator = result.slice(0, result.length - this.precision)
    let afterSeparator = result.slice(result.length - this.precision)

    if (beforeSeparator.length > 3) {
      var chars = beforeSeparator.split('').reverse()
      let withDots = ''
      for (var i = chars.length -1; i >= 0; i--) {
        let char = chars[i]
        let dot = i % 3 === 0 ? this.delimiter : ''
        withDots = `${withDots}${char}${dot}`
      }
      withDots = withDots.substring(0, withDots.length - 1)
      beforeSeparator = withDots
    }
    result = beforeSeparator + this.separator + afterSeparator

    if (this.unit) {
      result = `${this.unit} ${result}`
    }

    return result
  }
}

export default CentsFormatter
