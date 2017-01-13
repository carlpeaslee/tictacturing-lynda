import React, {Component} from 'react'
import styled from 'styled-components'
import Relay from 'react-relay'
import {media} from '../utils/media'

const Container = styled.div`
  display: flex;
  border: 1px rgb(200,200,200) solid;
  width: 800px;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
  ${media.handheld`
    width: 100%;
  `}
`

const Name = styled.h2`
  display: flex;
`

const GameListHeader = styled.h4`
  display: flex;
  padding-bottom: 2px;
  margin: 10px 0 5px 0;
`

const GameList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  padding: 5px;
  border: 1px lightgrey solid;
  justify-content: center;
`

const GameRecord = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 0;
  margin: 1px 0;
  background-color: ${props=>(props.id % 2 === 1)? 'rgb(225,225,225)' : 'rgb(240,240,240)'};
  box-sizing: border-box;
`

const ColumnLabels = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 0;
  margin: 3px 0;
  box-sizing: border-box;
  font-weight: bold;
`

const Column = styled.span`
  display: flex;
  width: 33%;
`

class Profile extends Component {

  get records () {
    return this.props.viewer.user.p1games.edges.map((edge, index)=>{
      let {
        node
      } = edge
      return (
        <GameRecord
          key={node.id}
          id={index}
        >
          <Column
            noMobile={true}
          >
            'Robot'
          </Column>
          <Column>
            {(node.winner) ? 'Won!' : "Didn't win"}
          </Column>
          <Column>
            {node.player1GuessCorrect}
          </Column>
          <Column>
            {new Date(node.createdAt).toLocaleDateString()}
          </Column>
        </GameRecord>
      )
    })

  }

  render () {
    let {
      email
    } = this.props.viewer.user
    return (
      <Container>
        <Name>
          {email}
        </Name>
        <GameList>
          <GameListHeader>
            My Games
          </GameListHeader>
          <ColumnLabels>
            <Column
              noMobile={true}
            >
              Opponent
            </Column>
            <Column>
              Outcome
            </Column>
            <Column>
              Guess
            </Column>
            <Column>
              Date
            </Column>
          </ColumnLabels>
          {this.records}
        </GameList>
      </Container>
    )
  }
}

export default Relay.createContainer(
  Profile, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            email
            p1games (first: 10) {
              edges {
                node {
                  id
                  player2 {
                    name
                  }
                  winner {
                    id
                  }
                  createdAt
                  player1GuessCorrect
                }
              }
            }
          }
        }
      `,
    },
  }
)
