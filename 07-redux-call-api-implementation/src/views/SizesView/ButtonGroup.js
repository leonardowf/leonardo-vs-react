import React, { PropTypes, Component } from 'react'
import classes from './ButtonGroup.scss'

class ButtonGroup extends Component {
  propTypes = {
    onChange: PropTypes.func.isRequired,
    name: PropTypes.string.isRequired,
    buttons: PropTypes.array.isRequired,
    selected: PropTypes.object.isRequired
  };

  constructor (props) {
    super(props)

    this.state = {
      buttons: this.props.buttons,
      selected: this.props.selected
    }

    this.renderButtons = this.renderButtons.bind(this)
  }

  componentWillReceiveProps (nextProps) {
    if (nextProps.selected) {
      this.setState({
        selected: nextProps.selected
      })
    }
  }

  renderButtons () {
    return this.state.buttons.map((button) => {
      return (
        <label key={button.type}>
          <input
            checked={this.state.selected.type === button.type}
            type='radio' name={this.props.name}
            value={button.type}
            onChange={() => this.props.onChange(button)}
            />

          <span className={classes['button-group-item']}>{button.name}</span>
        </label>
      )
    })
  }

  render () {
    return (
      <div className={classes['button-group']}>
        {this.renderButtons()}
      </div>
    )
  }
}

export default ButtonGroup
