import React from 'react'
import { Product } from 'src/@types/redux-types'
import { connect } from 'react-redux'
import OrderDataTable from './OrderDataTable/OrderDataTable'

const mapStateToProps = ({ order }: { order: Product[] }) => {
  return { order }
}

const Order = ({ order }: { order: Product[] }) => {
  return (
    <div>
      <OrderDataTable order={order} />
    </div>
  )
}

export default connect(mapStateToProps)(Order)
