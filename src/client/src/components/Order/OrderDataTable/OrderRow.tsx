import React from 'react'
import { Product } from 'src/@types/redux-types'

const OrderRow = ({ product }: { product: Product }) => {
  return (
    <tr>
      <th>{product.id}</th>
      <th>{product.name}</th>
      <th>{product.price}</th>
      <th>
        <button type="button" className="btn btn-info">
          -
        </button>
        {product.OrdersProducts.quantity}
        <button type="button" className="btn btn-info">
          +
        </button>
      </th>
    </tr>
  )
}

export default OrderRow
