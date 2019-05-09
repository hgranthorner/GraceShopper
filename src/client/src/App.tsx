import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
import { Home, Nav, Footer, Product, Login } from './components'
import { fetchLoggedInUser } from './store'

const mapDispatchToProps = (dispatch: any) => {
  return {
    fetchUser: (dispatch: any) => dispatch(fetchLoggedInUser())
  }
}

export default class App extends React.Component {
  componentDidMount() {
    this.props.fetchLoggedInUser()
  }
  render() {
    return (
      <HashRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/products/:id" exact component={Product} />
          <Route path="/login" exact component={Login} />
        </Switch>
        <Footer />
      </HashRouter>
    )
  }
}
