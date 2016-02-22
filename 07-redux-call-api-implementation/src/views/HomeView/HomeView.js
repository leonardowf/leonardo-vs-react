import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { actions as counterActions } from '../../redux/modules/counter'

// We define mapStateToProps where we'd normally use
// the @connect decorator so the data requirements are clear upfront, but then
// export the decorated component after the main class definition so
// the component can be tested w/ and w/o being connected.
// See: http://rackt.github.io/redux/docs/recipes/WritingTests.html
const mapStateToProps = (state) => ({
  counter: state.counter
})
export class HomeView extends React.Component {
  static propTypes = {
    counter: PropTypes.number.isRequired,
    doubleAsync: PropTypes.func.isRequired,
    increment: PropTypes.func.isRequired
  };

  render () {
    return (
      <div style={{height: '100%'}}>
        bla
      </div>
    )
  }
}

export default connect(mapStateToProps, counterActions)(HomeView)
