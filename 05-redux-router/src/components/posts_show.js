import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { routeActions } from 'react-router-redux'

class PostsShow extends Component {
  timer = null;

  constructor(props) {
    super(props);

    this.state = { counter: 0 }

    this.tick = this.tick.bind(this);
  }

  componentWillMount() {
    this.timer = setInterval(this.tick, 1000);
  }

  render() {
    console.log(this.props.routing.location.pathname);

    return (<div>My Counter contains: { this.state.counter }</div>);
  }

  tick() {
    this.setState({ counter: this.state.counter + 1})

    if (this.state.counter > 5) {
      this.props.push('/posts')
      clearTimeout(this.timer)
    }
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ push: routeActions.push}, dispatch);
}

function mapStateToProps(state) {
  return {
    routing: state.routing
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsShow);
