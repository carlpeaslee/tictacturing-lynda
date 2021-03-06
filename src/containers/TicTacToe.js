import React, {Component} from 'react'
import {Layer, Line, Stage, Text} from 'react-konva'
import CreateGameMutation from '../mutations/CreateGameMutation'
import Relay from 'react-relay'

class TicTacToe extends Component {

  constructor(props) {
    super(props)
    this.combos = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0,3,6],
      [1,4,7],
      [2,5,8],
      [0,4,8],
      [2,4,6]
    ]
  }

  state = {
    rows: 3,
    gameState: new Array(9).fill(false),
    ownMark: 'X',
    otherMark: 'O',
    gameOver: false,
    yourTurn: true,
    winner: false,
    win: false
  }

  componentWillMount(){
    let height = window.innerHeight
    let width = window.innerWidth
    let size = (height < width) ? height * .8 : width * .8
    let rows = this.state.rows
    let unit = size / rows
    let positions = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < rows; x++) {
        positions.push([x*unit,y*unit])
      }
    }

    let board = this.makeBoard(unit, size, rows)
    this.setState({
      size,
      rows,
      unit,
      positions,
      board,
    })
  }


  move = (index, mark) => {
    this.setState((prevState,props) => {
      let {
        gameState,
        yourTurn,
        gameOver,
        winner
      } = prevState
      yourTurn = !yourTurn
      gameState.splice(index, 1, mark)
      let foundWin = this.winChecker(gameState)
      if (foundWin) {
        winner = gameState[foundWin[0]]
      }
      if (foundWin || !gameState.includes(false) ) {
        gameOver = true
      }
      if (!yourTurn && !gameOver) {
        this.makeAiMove()
      }
      return {
        gameState,
        yourTurn,
        gameOver,
        win: foundWin || false,
        winner
      }
    })
  }

  winChecker = (gameState) => {
    let combos = this.combos
    return combos.find( (combo) => {
      let [a,b,c] = combo
      return (gameState[a] === gameState[b] && gameState[a] === gameState[c] && gameState[a])
    })
  }

  aiMove = (gameState) => {
    let combos = this.combos
    let move = false
    let winOrLose = combos.find( (combo) => {
      let [a,b,c] = combo
      if (gameState[a] === gameState[b] && !gameState[c] && gameState[a]) {
        move = c
      } else if (gameState[a] === gameState[c] && !gameState[b] && gameState[a]) {
        move = b
      } else if (gameState[b] === gameState[c] && !gameState[a] && gameState[b] ) {
        move = a
      }
      return move
    })
    if (!winOrLose) {
      let openSquares = []
      gameState.forEach( (square, index) => {
        if (!square) {
          openSquares.push(index)
        }
      })
      move = openSquares[this.random(0,open.length)]
    }
    return move
  }

  random = (min, max) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
  }

  makeAiMove = () => {
    let {
      gameState,
      otherMark
    } = this.state
    let aiMove = this.aiMove(gameState)

    setTimeout(()=>{
      this.move(aiMove,otherMark)
    }, this.random(1000,3000))
  }

  squares = () => {
    let {
      unit,
      positions,
      gameState,
      win,
      gameOver,
      yourTurn,
      ownMark
    } = this.state
    return positions.map( (position, index) => {
      let mark = gameState[index]
      let fill = 'black'
      if (win && win.includes(index)) {
        fill = 'lightgreen'
      }
      let move = this.move
      if (gameOver || !yourTurn || mark) {
        move = () => console.log('nope!')
      }
      return (
        <Text
          key={index}
          index={index}
          x={position[0]}
          y={position[1]}
          fontSize={unit}
          width={unit}
          text={mark}
          fill={fill}
          fontFamily={'Helvetica'}
          align={'center'}
          onClick={(event)=>{
            let index = event.target.index
            move(index, ownMark)
          }}
        />
      )
    })
  }

  makeBoard = (unit, size, rows) => {
    let board = []
    let stroke = 'grey'
    let strokeWidth = 10
    for (let i = 1; i < rows; i++) {
      let position = unit * i
      board.push(
        <Line
          points={[position, 0, position, size]}
          stroke={stroke}
          strokeWidth={strokeWidth}
          key={i + 'v'}
        />
      )
      board.push(
        <Line
          points={[0, position, size, position]}
          stroke={stroke}
          strokeWidth={strokeWidth}
          key={i + 'h'}
        />
      )
    }
    return board
  }

  recordGame = (guess) => {
    let {
      self
    } = this.props
    let {
      winner,
      ownMark
    } = this.state
    if (self) {
      let winnerId = (winner === ownMark) ? self.id : undefined
      let guessCorrect = ('ROBOT') ? true : false
      this.props.relay.commitUpdate(
        new CreateGameMutation({
          user: this.props.self,
          winnerId,
          guess,
          guessCorrect
        })
      )
    }
    this.setState({
      gameState: new Array(9).fill(false),
      gameOver: false,
      yourTurn: true,
      winner: false,
      win: false,
    })
  }



  showMessages = () => {
    let gameOver = this.state.gameOver
    if (gameOver) {
      return (
        <div
          style={{
            backgroundColor: 'salmon',
            position: 'absolute',
            margin: 'auto',
            top: '100px'
          }}
        >
          <h3>What do you think?</h3>
          <h4
            onClick={()=>{this.recordGame('HUMAN')}}
          >Human</h4>
          <h4>Robot</h4>
        </div>
      )
    }
  }


  render () {
    let {
      size,
      board
    } = this.state
    return (
      <div>
        <Stage
          width={size}
          height={size}
        >

          <Layer>
            {board}
          </Layer>
          <Layer>

            {this.squares()}
          </Layer>

        </Stage>
        {this.showMessages()}
      </div>
    )
  }
}

export default Relay.createContainer(
  TicTacToe, {
    fragments: {
      self: () => Relay.QL`
        fragment on User {
          id
        }
      `,
    },
  }
)
