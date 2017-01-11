import React, {Component} from 'react'
import auth from '../utils/auth'
import RaisedButton from 'material-ui/RaisedButton'

class Authentication extends Component {

  static defaultProps = {
    authenticated: false,
  }

  get checkAuthentication () {
    if (this.props.authenticated) {
      return (
        <RaisedButton
          label={'Logout'}
          onTouchTap={auth.logout}
          fullWidth={true}
        />
      )
    } else {
      return (
        <RaisedButton
          label={'Login'}
          onTouchTap={auth.showLock}
          primary
          fullWidth={true}

        />
      )
    }
  }

  render () {
    return (
      <div>
        {this.checkAuthentication}
      </div>
    )
  }
}

export default Authentication
