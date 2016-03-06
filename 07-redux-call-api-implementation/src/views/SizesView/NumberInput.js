import React, { PropTypes, Component } from 'react'
import isNumber from '../../helpers/isNumber'

export default class NumberInput extends Component {
  propTypes = {
    onChange: PropTypes.func.isRequired,
    value: PropTypes.number.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      value: props.value
    }

    this.onInputChange = this.onInputChange.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      value: nextProps.value
    })
  }

  onInputChange (event) {
    const input = event.target.value
    if (isNumber(input)) {
      this.setState({
        value: input
      })

      this.props.onChange(parseInt(input))
    }

    if (input.length === 0) {
      this.setState({
        value: input
      })
      this.props.onChange(0)
    }
  }

  render () {
    return <input value={this.state.value} onChange={this.onInputChange}>

    </input>
  }
}
