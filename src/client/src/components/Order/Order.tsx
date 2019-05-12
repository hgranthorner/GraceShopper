import React, { useEffect } from 'react'
import { Product, Order } from 'src/@types/redux-types'
import { connect } from 'react-redux'
import OrderDataTable from './OrderDataTable/OrderDataTable'
import { fetchOrders } from '../../store'

const mapStateToProps = ({ orders }: { orders: Order[] }) => ({ orders })

const mapDispatchToProps = (dispatch: any) => ({
  fetchOrders: () => dispatch(fetchOrders())
})

const Order = ({ orders, fetchOrders }: { orders: Order[]; fetchOrders: any }) => {
  useEffect(() => {
    fetchOrders()
  }, [])

  return <div>{orders.length > 0 ? orders.map(order => <OrderDataTable key={order.id} order={order} />) : null}</div>
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Order)
