import React from 'react'
import { Sidebar } from './Sidebar'
import { ProductList } from './ProductList'

export default function Home() {
  return (
    <div className="d-flex justify-content-around">
      <Sidebar />
      <ProductList />
    </div>
  )
}
