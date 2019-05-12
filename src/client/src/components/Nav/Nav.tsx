import React from 'react'
import Search from './Search'
import { noUserLoggedInNav, userLoggedInNav } from './nav-links'
import { User, Order } from 'src/@types/redux-types'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { fetchProducts } from '../../store'

interface GHNavLink {
  name: string
  path: string
}

const mapStateToProps = ({ user, cartCount }: { user: User; cartCount: number }) => {
  return { user, cartCount }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchProducts: () => dispatch(fetchProducts())
})

const Nav = ({ user, cartCount }: { user: User; cartCount: number }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
      <div className="navbar-brand">
        <Link to="/" className="nav-item nav-link" onClick={fetchProducts}>
          Welcome to Bailie's Beauts
        </Link>
      </div>
      <div className="navbar-nav">
        {user.name !== ''
          ? userLoggedInNav.map((link: GHNavLink) => (
              <NavLink className="nav-item nav-link" to={link.path} key={link.path}>
                {link.name === 'Cart' ? (cartCount > 0 ? `${link.name}(${cartCount})` : link.name) : `${link.name}`}
              </NavLink>
            ))
          : noUserLoggedInNav.map((link: GHNavLink) => (
              <NavLink className="nav-item nav-link" to={link.path} key={link.path}>
                {link.name === 'Cart' ? (cartCount > 0 ? `${link.name}(${cartCount})` : link.name) : `${link.name}`}
              </NavLink>
            ))}
      </div>
      <Search />
    </nav>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Nav)
