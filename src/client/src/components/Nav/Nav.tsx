import React from 'react'
import Search from './Search'
import { NavLink } from 'react-router-dom'
import { noUserLoggedInNav, userLoggedInNav } from './nav-links'
import { User } from 'src/@types/redux-types'
import { connect } from 'react-redux'

const mapStateToProps = ({ user }: { user: User }) => {
  return { user }
}

const Nav = ({ user }: { user: User }) => {
  console.log('user on state: ', user)
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">Welcome to Bailie's Beauts</div>
      <div className="navbar-nav">
        {user.name !== ''
          ? userLoggedInNav.map((link: any) => (
              <NavLink
                className="nav-item nav-link"
                to={link.path}
                key={link.path}
              >
                {link.type}
              </NavLink>
            ))
          : noUserLoggedInNav.map((link: any) => (
              <NavLink
                className="nav-item nav-link"
                to={link.path}
                key={link.path}
              >
                {link.type}
              </NavLink>
            ))}
      </div>
      <Search />
    </nav>
  )
}

export default connect(mapStateToProps)(Nav)
