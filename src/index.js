/* @flow */
import React from 'react'
import ReactDOM from 'react-dom'
import {Router, browserHistory, applyRouterMiddleware} from 'react-router'
import Routes from './routes'
import Relay from 'react-relay'
import useRelay from 'react-router-relay'
import {
  RelayNetworkLayer,
  urlMiddleware
} from 'react-relay-network-layer'

const createHeaders = (idToken) => {
  if (idToken) {
    return {
      Authorization: 'Bearer ' + idToken
    }
  } else {
    return {}
  }
}

Relay.injectNetworkLayer(
  new RelayNetworkLayer([
    urlMiddleware({
      url: (req) => process.env.REACT_APP_GRAPHQL_URL,
    }),
    next => req => {
      let idToken = localStorage.getItem('idToken')
      let headers = createHeaders(idToken)
      req.headers = {
        ...req.headers,
        ...headers
      }
      return next(req)
    },
  ],{ disableBatchQuery: true })
)

ReactDOM.render(
  <Router
    environment={Relay.Store}
    render={applyRouterMiddleware(useRelay)}
    history={browserHistory}
    routes={Routes}
  />,
  document.getElementById('root')
)
