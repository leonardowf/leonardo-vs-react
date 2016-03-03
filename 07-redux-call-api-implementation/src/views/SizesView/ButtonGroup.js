import React, { PropTypes, Component } from 'react'
import classes from './ButtonGroup.scss'

class ButtonGroup extends Component {
  // static propTypes = {
  //
  // };

  constructor (props) {
    super(props)
  }

  render () {
    return (
      <div className={classes['button-group']}>
        <label>
          <input type="radio" name='button-group' value='item'></input>
          <span className={classes['button-group-item']}>Item</span>
        </label>
        <label>
          <input type='radio' name='button-group' value='other-item'></input>
          <span className={classes['button-group-item']}>Other But Longer Item</span>
        </label>
        <label>
          <input type='radio' name='button-group' value='other-item'></input>
          <span className={classes['button-group-item']}>Third</span>
        </label>
        <label>
          <input type='radio' name='button-group' value='third'></input>
          <span className={classes['button-group-item']}>Last Item</span>
        </label>
      </div>
    )
  }
}

export default ButtonGroup
