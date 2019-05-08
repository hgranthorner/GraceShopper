import React from 'react'
import Search from './Search'
import { NavLink } from 'react-router-dom'

export default function Nav() {
  const links = [
    {
      type: 'Home',
      path: '/'
    },
    {
      type: 'Cart',
      path: '/orders'
    },
    {
      type: 'Browse by category',
      path: '/categories'
    },
    {
      type: 'Browse by product',
      path: '/products'
    }
  ]
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">Welcome to Bailie's Beauts</div>
      <div className="navbar-nav">
        {links.map(link => (
          <NavLink className="nav-item nav-link" to={link.path}>
            {link.type}
          </NavLink>
        ))}
      </div>
      <Search />
    </nav>
  )
}
