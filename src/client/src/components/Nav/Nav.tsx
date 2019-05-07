import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

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
    <div className="d-flex justify-content-around">
      <h2>Welcome to Bailie's Beauts</h2>
      <ul>
        {links.map(link => (
          <Link to={link.path}>{link.type}</Link>
        ))}
      </ul>
      <Search />
    </div>
  )
}
