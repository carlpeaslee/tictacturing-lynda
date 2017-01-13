import Relay from 'react-relay'

export default class CreateMoveMutation extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation{createMove}`
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreateMovePayload {
        move
      }
    `
  }
  getConfigs () {
    return [{
      type: 'REQUIRED_CHILDREN',
      children: [
        Relay.QL`
          fragment on CreateMovePayload {
            move {
              location
            }
          }
        `,
      ],
    }]
  }

  getVariables () {
    return {
      location: this.props.location,
      gameId: this.props.gameId,
      mover: this.props.mover
    }
  }

}
