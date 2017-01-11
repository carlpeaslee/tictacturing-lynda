import React, {Component} from 'react'
import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  border: 1px rgb(200,200,200) solid;
  width: 800px;
  min-height: 100vh;
  flex-direction: column;
  align-items: center;
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

  static defaultProps = {
    name: "USER'S_NAME",
    records: [
      {
        opponent: 'ROBOT',
        guess: 'ROBOT',
        outcome: 'LOSS',
        date: '12/25/2016',
        id: '0001'
      },
      {
        opponent: 'SARAH',
        guess: 'ROBOT',
        outcome: 'LOSS',
        date: '12/26/2016',
        id: '0002'
      },
      {
        opponent: 'ROBOT',
        guess: 'HUMAN',
        outcome: 'WIN',
        date: '12/27/2016',
        id: '0003'
      },
    ]
  }

  get records () {
    return this.props.records.map(record=>(
      <GameRecord
        key={record.id}
        id={record.id}
      >
        <Column>
          {record.opponent}
        </Column>
        <Column>
          {record.outcome}
        </Column>
        <Column>
          {record.guess}
        </Column>
        <Column>
          {record.date}
        </Column>
      </GameRecord>
    ))

  }

  render () {
    let {
      name
    } = this.props
    return (
      <Container>
        <Name>
          {name}
        </Name>
        <GameList>
          <GameListHeader>
            My Games
          </GameListHeader>
          <ColumnLabels>
            <Column>
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

export default Profile
