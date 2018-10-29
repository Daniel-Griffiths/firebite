import React, { Component } from 'react'
import { Route, Switch, Redirect, BrowserRouter as Router } from 'react-router-dom'

// Containers
import RootContainer from './containers/RootContainer'
import HomeContainer from './containers/HomeContainer'

export default class Routes extends Component {
  render() {
    return (
      <Router>
        <RootContainer>
          <Switch>
            <Route exact path="/" component={HomeContainer} />
          </Switch>
        </RootContainer>
      </Router>
    )
  }
}
