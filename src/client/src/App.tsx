import React, { useEffect } from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'
<<<<<<< HEAD
import { Home, Nav, Footer, Product, Login, Order } from './components'

export default class App extends React.Component {
  render() {
    return (
      <HashRouter>
        <Nav />
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/categories/" component={Home} />
          <Route path="/products/:id" exact component={Product} />
          <Route path="/login" exact component={Login} />
          <Route path="/orders" exact component={Order} />
        </Switch>
        <Footer />
      </HashRouter>
    )
  }
=======
import { Home, Nav, Footer, Product, Login } from './components'
import { connect } from 'react-redux'
import { checkIfLoggedIn } from './store'
import { User } from './@types/redux-types'

const mapStateToProps = ({ user }: { user: User }) => ({
  user
})

const mapDispatchToProps = (dispatch: any) => ({
  checkIfLoggedIn: () => dispatch(checkIfLoggedIn())
})

const App = ({ user, checkIfLoggedIn }: { user: User; checkIfLoggedIn: any }) => {
  useEffect(() => {
    if (user.id === -1) checkIfLoggedIn()
  })

  return (
    <HashRouter>
      <Nav />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/categories/" component={Home} />
        <Route path="/products/:id" exact component={Product} />
        <Route path="/login" exact component={Login} />
      </Switch>
      <Footer />
    </HashRouter>
  )
>>>>>>> bba20c860ec93cfb710a7972fc6115cb39b5f93a
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
