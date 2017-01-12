import Auth0Lock from 'auth0-lock'
import {auth0Domain, auth0ClientId, url} from '../config'
import {cyan500} from 'material-ui/styles/colors'
import CreateUser from '../mutations/CreateUser'
import SigninUser from '../mutations/SigninUser'

class AuthService {
  constructor(clientId, domain) {

    this.lock = new Auth0Lock(clientId, domain, {
      auth: {
        params: {
          scope: 'openid email',
        },
      },
      theme: {
        logo: `${url}/logo.png`,
        primaryColor: cyan500
      },
      languageDictionary: {
        title: "TicTacTuring"
      },
    })

    this.showLock = this.showLock.bind(this)

    this.lock.on('authenticated', this.authProcess.bind(this))


  }

  showLock() {
    this.lock.show()
  }


  setToken = (authFields) => {
    let {
      idToken,
      exp
    } = authFields
    localStorage.setItem('idToken', idToken)
    localStorage.setItem('expiration', exp)
  }

  authProcess = (authResult) => {
    const {
      exp,
      email
    } = authResult.idTokenPayload
    const idToken = authResult.idToken

    SigninUser({
      idToken,
      email,
      exp
    }).then(
      success => success,
      rejected => {
        CreateUser({
          idToken,
          email,
          exp
        }).then(
          success => success,
          error => console.log('CreateUser error')
        )
      }
    )
  }


  isCurrent() {
    let expString = localStorage.getItem('expiration')
    if (!expString) {
      return false
    }
    let now = Date.now()
    let exp = new Date(parseInt(expString, 10))
    if (exp < now) {
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
