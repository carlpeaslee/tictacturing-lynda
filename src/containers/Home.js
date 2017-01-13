import React, {Component} from 'react'
import TicTacToe from './TicTacToe'
import Relay from 'react-relay'

class Home extends Component {


  render () {
    return (
      <TicTacToe
        self={this.props.viewer.user}
        viewer={this.props.viewer}
        gameId={'cixu6k67b14sr0179hvxspjjt'}
        getGame={true}
      />
    )
  }
}

export default Relay.createContainer(
  Home, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
            ${TicTacToe.getFragment('self')}
          }
        }
      `,
    },
  }
)
