import Auth0Lock from 'auth0-lock'
import {auth0Domain, auth0ClientId, url} from '../config'
import {cyan500} from 'material-ui/styles/colors'


class AuthService {
  constructor(clientId, domain) {

    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        responseType: 'token',
      },
      params: {
        scope: 'openid'
      },
      theme: {
        logo: `${url}/logo.png`,
        primaryColor: cyan500
      },
      languageDictionary: {
        title: "TicTacTuring"
      },
    })

    this.lock.on('authenticated', this._doAuthentication.bind(this))

    this.login = this.login.bind(this)

  }

  _doAuthentication =  (authResult) => {
    this.setToken(authResult.idToken)
    this.setExpiration(authResult.idTokenPayload.exp)
  }

  login() {
    this.lock.show()
  }

  setToken(idToken) {
    localStorage.setItem('idToken', idToken)
  }

  setExpiration(expiration) {
    localStorage.setItem('expiration', expiration)
  }

  isCurrent() {
    let now = Date.now()
    let expiration = localStorage.getItem('expiration')
    if (!expiration) {
      return false
    } else if (expiration < now) {
      return false
    } else {
      return true
    }
  }

  getToken() {
    return localStorage.getItem('idToken')
  }

  logout() {
    localStorage.removeItem('idToken')
    localStorage.removeItem('expiration')
    location.reload()
  }


}

const auth = new AuthService(auth0ClientId, auth0Domain)


export default auth
