import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import { fetchProducts } from '../../store'
import Search from './Search'

export default function Nav() {
  return (
    <div className="d-flex justify-content-around">
      <h1>Welcome to Bailie's Beauts</h1>
      <Search />
    </div>
  )
}
