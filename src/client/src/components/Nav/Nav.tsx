import React from 'react'
import Search from './Search'
import { noUserLoggedInNav, userLoggedInNav } from './nav-links'
import { User, Order } from 'src/@types/redux-types'
import { connect } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { fetchProducts } from '../../store'

const mapStateToProps = ({ user, order }: { user: User; order: Order[] }) => {
  return { user, order }
}

const mapDispatchToProps = (dispatch: any) => ({
  fetchProducts: () => dispatch(fetchProducts())
})

const Nav = ({ user, order }: { user: User; order: Order[] }) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light mb-2">
      <div className="navbar-brand">
        <Link to="/" className="nav-item nav-link" onClick={fetchProducts}>
          Welcome to Bailie's Beauts
        </Link>
      </div>
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
                {link.type === 'Cart'
                  ? order.length > 0
                    ? `${link.type}(${order.length})`
                    : `${link.type}`
                  : ''}
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
