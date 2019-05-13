import React, { useEffect } from 'react'
import { Product, Order } from 'src/@types/redux-types'
import { connect } from 'react-redux'
import OrderDataTable from './OrderDataTable/OrderDataTable'
import { fetchOrders } from '../../store'
import { Link } from 'react-router-dom'

const mapStateToProps = ({ orders }: { orders: Order[] }) => ({ orders })

const mapDispatchToProps = (dispatch: any) => ({
  fetchOrders: () => dispatch(fetchOrders())
})

const Order = ({ orders, fetchOrders }: { orders: Order[]; fetchOrders: any }) => {
  useEffect(() => {
    fetchOrders()
  }, [])

  const cart = orders.find(order => order.status === 'cart')
  const oldOrders = orders.filter(order => order.status !== 'cart')
  return (
    <div>
      {cart ? (
        <div>
          <h3>Your Cart</h3>
          <OrderDataTable key={cart.id} order={cart} isCart={true} />
          <Link to={`/orders/${cart.id}/checkout`} className="btn btn-raised btn-success">
            Checkout
          </Link>
        </div>
      ) : null}
      {oldOrders.length > 0
        ? oldOrders.map(order => (
            <div>
              <h4>Status: {order.status}</h4>
              <OrderDataTable key={order.id} order={order} isCart={false} />
            </div>
          ))
        : null}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)
