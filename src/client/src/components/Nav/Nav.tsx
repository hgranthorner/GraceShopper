import React from 'react'
import Search from './Search'
import { Link } from 'react-router-dom'

export default function Nav() {
  console.log('hello')
  const links = [
    {
      type: 'Home',
      path: '/'
    },
    {
      type: 'Cart',
      path: '/users/:id/orders'
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
      <h1>Welcome to Bailie'ssss Beauts</h1>
      <ul>
        {links.map(link => {
          ;<Link to={link.path}>{link.type}</Link>
        })}
      </ul>
      <Search />
    </div>
  )
}
