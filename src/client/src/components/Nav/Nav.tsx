import React from 'react'
import Search from './Search'
import { noUserLoggedInNav, userLoggedInNav } from './nav-links'
import { User } from 'src/@types/redux-types'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { fetchProducts } from '../../store'

const mapStateToProps = ({ user }: { user: User }) => {
  return { user }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchProducts: () => dispatch(fetchProducts())
})

const Nav = ({ user, fetchProducts }: { user: User; fetchProducts: any }) => {
  console.log('user on state: ', user)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">
        <Link to="/" className="nav-item nav-link" onClick={fetchProducts}>
          Welcome to Bailie's Beauts
        </Link>
      </div>
      <div className="navbar-nav">
        {user.name !== ''
          ? userLoggedInNav.map((link: any) => (
              <NavLink className="nav-item nav-link" to={link.path} key={link.path}>
                {link.type}
              </NavLink>
            ))
          : noUserLoggedInNav.map((link: any) => (
              <NavLink className="nav-item nav-link" to={link.path} key={link.path}>
                {link.type}
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
