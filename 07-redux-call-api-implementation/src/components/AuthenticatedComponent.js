import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

export function requireAuthentication (Component) {
  class AuthenticatedComponent extends React.Component {

    static propTypes = {
      token: PropTypes.string,
      email: PropTypes.string,
      redirectAfterLogin: PropTypes.func,
      location: PropTypes.object.isRequired,
      push: PropTypes.func,
      dispatch: PropTypes.func.isRequired
    };

    isAuthenticated () {
      const loggedIn = this.props.token != null && this.props.email != null
      return loggedIn
    }

    componentWillMount () {
      this.checkAuth()
    }

    componentWillReceiveProps (nextProps) {
      this.checkAuth()
    }

    checkAuth () {
      if (!this.isAuthenticated()) {
        // let redirectAfterLogin = this.props.location.pathname
        this.props.dispatch(routeActions.push('/'))
      }
    }

    render () {
      return (
        <div style={{height: '100%'}}>
          {this.isAuthenticated() === true
            ? <Component {...this.props}/>
          : <div>please login</div>
          }
        </div>
      )
    }
  }

  const mapStateToProps = (state) => ({
    token: state.login.token,
    email: state.login.email
  })

  return connect(mapStateToProps)(AuthenticatedComponent)
}
