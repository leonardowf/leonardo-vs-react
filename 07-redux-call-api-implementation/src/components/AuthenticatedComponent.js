import React, { PropTypes } from 'react'
import { connect } from 'react-redux'
import { routeActions } from 'react-router-redux'

import MenuItem from '../views/MenuView/MenuItem'
import TopHeaderView from '../views/MenuView/TopHeaderView'

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

    renderAuthenticationSuccess () {
      return (
        <div style={{height: '100%'}}>
          <TopHeaderView />
          <div className='below-menu'>
            <div className='left-menu'>
              <MenuItem image='cogs' name='Tamanhos' isSelected={true}/>
              <MenuItem image='cutlery' name='Sabores' isSelected={false}/>
            </div>
            <div>
              <Component {...this.props} />
            </div>
          </div>
        </div>
      )
    }

    renderAuthenticationFailure () {
      return <div>please login</div>
    }

    render () {
      return (
        <div style={{height: '100%'}}>
          {this.isAuthenticated() === true ? this.renderAuthenticationSuccess() : this.renderAuthenticationFailure()}
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
