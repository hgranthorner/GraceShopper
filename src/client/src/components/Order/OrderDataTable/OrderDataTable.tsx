import React from 'react'
import { Product, Order } from 'src/@types/redux-types'
import OrderRow from './OrderRow'

const OrderDataTable = ({ order }: { order: Order }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>id</th>
          <th>name</th>
          <th>price</th>
          <th>quantity</th>
        </tr>
      </thead>
      <tbody>
        {order.products.length > 0 ? order.products.map((product: Product) => <OrderRow product={product} key={product.id} />) : null}
      </tbody>
    </table>
  )
}

export default OrderDataTable
