import React from 'react'
import Search from './Search'
import { NavLink } from 'react-router-dom'
import links from './nav-links'

export default function Nav() {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="navbar-brand">Welcome to Bailie's Beauts</div>
      <div className="navbar-nav">
        {links.map(link => (
          <NavLink className="nav-item nav-link" to={link.path} key={link.path}>
            {link.type}
          </NavLink>
        ))}
      </div>
      <Search />
    </nav>
  )
}
