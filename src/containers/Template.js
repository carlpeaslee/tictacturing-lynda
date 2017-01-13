import React, {Component} from 'react'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider'
import injectTapEventPlugin from 'react-tap-event-plugin'
import NavDrawer from '../components/NavDrawer'
import SiteHeader from '../styled/SiteHeader'
import Main from '../styled/Main'
import '../utils/globalstyles.css'
import Relay from 'react-relay'

injectTapEventPlugin()

class Template extends Component {
  render () {
    return (
      <MuiThemeProvider>
        <div>
          <NavDrawer
            user={this.props.viewer.user}
          />
          <SiteHeader/>
          <Main>
            {this.props.children}
          </Main>
        </div>
      </MuiThemeProvider>
    )
  }
}

export default Relay.createContainer(
  Template, {
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
