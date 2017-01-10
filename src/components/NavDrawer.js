import React, {Component} from 'react'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import FloatingActionButton from 'material-ui/FloatingActionButton'
import Menu from 'material-ui/svg-icons/navigation/menu'
import {Link} from 'react-router'

class NavDrawer extends Component {

  state = {
    open: true
  }

  handleToggle = () => this.setState({open: !this.state.open})

  handleClose = () => this.setState({open: false})


  render () {
    return (
      <div>
        <FloatingActionButton
          onTouchTap={this.handleToggle}
        >
          <Menu />
        </FloatingActionButton>
        <Drawer
          docked={false}
          open={this.state.open}
          onRequestChange={(open) => this.setState({open})}
          overlayStyle={{opacity:0}}
        >
          <div
            style={{
              height: '100px',
              backgroundColor: 'salmon'
            }}
          >
            Login Component
          </div>
          <Divider/>
          <Link
            to={'/'}
          >
            <MenuItem>
              Play
            </MenuItem>
          </Link>
          <Link
            to={'/profile'}
          >
            <MenuItem>
              Profile
            </MenuItem>
          </Link>


        </Drawer>

      </div>
    )
  }
}

export default NavDrawer
