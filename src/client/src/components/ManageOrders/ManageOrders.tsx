import React from 'react'
import { connect } from 'react-redux'
import Cart from './Cart'
import Order from './Order'

const mapStateToProps = ({ orders }) => ({
  orders
})

const ManageOrders = ({ orders }) => {
  const cart = orders.find(order => order.status === 'cart')
  const pastOrders = orders.filter(order => order.status !== 'cart')
  return (
    <div>
      <h2>Your cart:</h2>
      <br />
      <Cart cart={cart} />
      <h2>Past orders:</h2>
      {pastOrders.map(order => (
        <Order order={order} key={order.id} />
      ))}
    </div>
  )
}

export default ManageOrders
