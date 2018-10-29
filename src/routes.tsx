import React, { Component } from 'react'
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom'

// Containers
import RootContainer from './containers/RootContainer'
import HomeContainer from './containers/HomeContainer'

export default class Routes extends Component {
  public render() {
    return (
      <Router>
        <RootContainer>
          <Switch>
            <Route exact={true} path="/" component={HomeContainer} />
          </Switch>
        </RootContainer>
      </Router>
    )
  }
}
