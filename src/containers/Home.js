import React, {Component} from 'react'
import TicTacToe from './TicTacToe'
import Relay from 'react-relay'

class Home extends Component {

  render () {
    return (
      <TicTacToe/>
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
          }
        }
      `,
    },
  }
)
