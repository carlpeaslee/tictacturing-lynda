import React, {Component} from 'react'
import {Layer, Line, Stage, Text} from 'react-konva'

class TicTacToe extends Component {

  state = {
    rows: 3,
    size: 1000,
    game: new Array(9)
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
      board
    })
  }

  // componentWillReceiveProps (newProps) {
  // }

  move = (event) => {
    //this is where we will make moves
    let index = event.target.index
    console.log('move at square', index)
    this.setState((prevState,props) => {
      let newGameState = prevState.game
      newGameState.splice(index, 1, 'X')
      return {
        game: newGameState
      }
    })
  }


  get squares () {
    let {
      unit,
      positions,
      game
    } = this.state
    let marks = positions.map( (position, index) => {
      let mark = ''
      if (game[index] === 'X') {
        mark = 'X'
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
          fill={'Green'}
          fontFamily={'Helvetica'}
          align={'center'}
          onClick={(event)=>{this.move(event)}}
        />
      )
    })
    return marks
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

  render () {
    let {
      size,
      board
    } = this.state
    return (
      <Stage
        width={size}
        height={size}
      >
        <Layer>
          {board}
        </Layer>
        <Layer>

          {this.squares}
        </Layer>
      </Stage>
    )
  }
}

export default TicTacToe
