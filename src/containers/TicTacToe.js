import React, {Component} from 'react'
import {Layer, Line, Stage, Text} from 'react-konva'

class TicTacToe extends Component {

  state = {
    rows: 3,
    size: 1000,
    game: new Array(9)
  }

  componentWillMount(){
    let size = window.innerHeight * .8
    let rows = this.state.rows
    let unit = size / rows
    let positions = []
    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < rows; x++) {
        positions.push([x*unit,y*unit])
      }
    }
    this.setState({
      size,
      rows,
      unit,
      positions,
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


  squares = () => {
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
      console.log(mark)
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
          fontFamily={'Roboto'}
          align={'center'}
          onClick={(event)=>{this.move(event)}}
        />
      )
    })
    return marks
  }

  render () {
    let {
      unit,
      size
    } = this.state
    let oneThird = unit * 1
    let twoThirds = unit * 2
    console.log(this.state)
    return (
      <Stage
        width={size} height={size}
      >
        <Layer>
          <Line
            points={[oneThird, 0, oneThird, size]}
            stroke={'grey'}
            strokeWidth={10}
          />
          <Line
            points={[twoThirds, 0, twoThirds, size]}
            stroke={'grey'}
            strokeWidth={10}
          />
          <Line
            points={[0, oneThird, size, oneThird]}
            stroke={'grey'}
            strokeWidth={10}
          />
          <Line
            points={[0, twoThirds, size, twoThirds]}
            stroke={'grey'}
            strokeWidth={10}
          />
        </Layer>
        <Layer>

          {this.squares()}
        </Layer>
      </Stage>
    )
  }
}

export default TicTacToe
