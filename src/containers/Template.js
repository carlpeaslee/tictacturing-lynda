import React, {Component} from 'react'

class Template extends Component {

  render () {
    return (
      <div>
        <header>
          <h1>TicTacTuring</h1>
        </header>
        <main>
          {this.props.children}
        </main>
        <footer>
          <i>Copyright Carl Peaslee</i>
        </footer>
      </div>
    )
  }
}

export default Template
