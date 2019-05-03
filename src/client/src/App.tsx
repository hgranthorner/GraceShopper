import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Home, Nav } from './components'

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </HashRouter>
    )
  }
}
