import Relay from 'react-relay'
import SigninUser from './SigninUser'

class CreateUserMutation extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation{createUser}`
  }

  getVariables () {
    return {
      email: this.props.email,
      authProvider: {
        auth0: {
          idToken: this.props.idToken
        }
      },
    }
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreateUserPayload {
        user {
          id
        }
        viewer {
          id
        }
      }
    `
  }

  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      connectionName: 'allUsers',
      edgeName: 'user',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }
}


const CreateUser = (authFields) => {
  return new Promise( (resolve, reject) => {
    Relay.Store.commitUpdate(
      new CreateUserMutation({
        email: authFields.email,
        idToken: authFields.idToken,
        name: authFields.name
      }), {
        onSuccess: (response) => {
          SigninUser(authFields)
          resolve(response)
        },
        onFailure: (response) => {
          reject(response)
        }
      }
    )
  })
}

export default CreateUser
