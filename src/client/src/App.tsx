import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Home, Nav, Footer, Product } from './components'

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products/:id" exact component={Product} />
        </Switch>
        <Footer />
      </HashRouter>
    )
  }
}
