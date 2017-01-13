import Relay from 'react-relay'

export default class CreateGameMutation extends Relay.Mutation {

  getMutation () {
    return Relay.QL`mutation{createGame}`
  }

  getFatQuery () {
    return Relay.QL`
      fragment on CreateGamePayload {
        player1
      }
    `
  }
  getConfigs () {
    return [{
      type: 'RANGE_ADD',
      parentName: 'player1',
      parentID: this.props.user.id,
      connectionName: 'moves',
      edgeName: 'edge',
      rangeBehaviors: {
        '': 'append',
      },
    }]
  }

  getVariables () {
    return {
      player1Id: this.props.user.id,
      winnerId: this.props.winnerId,
      loser: this.props.loser,
      player1Guess: this.props.guess,
      player1GuessCorrect: this.props.guessCorrect
    }
  }

}
