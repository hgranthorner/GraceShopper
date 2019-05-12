import React from 'react'
import { Product } from 'src/@types/redux-types'
import OrderRow from './OrderRow'

const OrderDataTable = ({ order }: { order: Product[] }) => {
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
      <tbody>{order.length > 0 ? order.map((product: Product) => <OrderRow product={product} key={product.id} />) : null}</tbody>
    </table>
  )
}

export default OrderDataTable
