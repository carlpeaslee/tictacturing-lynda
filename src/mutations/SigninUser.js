import Relay from 'react-relay'
import auth from '../utils/auth'

class SigninUserMutation extends Relay.Mutation {
  getMutation() {
    return Relay.QL`mutation {signinUser}`
  }

  getFatQuery() {
    return Relay.QL`fragment on SigninPayload {
      token
      viewer {
        user
      }
      user
    }`
  }

  getConfigs() {
    return [
      {
        type: 'FIELDS_CHANGE',
        fieldIDs: {
          viewer: "viewer-fixed"
         },
      },
      {
        type: 'REQUIRED_CHILDREN',
        children: [
          Relay.QL`
            fragment on SigninPayload {
              token
              viewer {
                user {
                  id
                }
                id
              }
              user {
                id
              }
            }
          `,
        ],
      },
    ]
  }

  getVariables() {
    return {
      auth0: {
        idToken: this.props.idToken,
      },
    }
  }
}

const SigninUser = (authFields) => {
  let {
    idToken,
  } = authFields
  return new Promise ( (resolve, reject) => {
    Relay.Store.commitUpdate(
      new SigninUserMutation({
        idToken
      }), {
        onSuccess: (response) => {
          auth.setToken(authFields)
          resolve(idToken)
        },
        onFailure: (response) => {
          reject(response.getError())
        }
      }
    )
  })
}

export default SigninUser
