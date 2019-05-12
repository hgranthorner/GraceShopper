import React from 'react'
import { Product } from 'src/@types/redux-types'

const OrderRow = ({ product }: { product: Product }) => {
  return (
    <tr>
      <th>{product.id}</th>
      <th>{product.name}</th>
      <th>{product.price}</th>
      <th>{product.quantity}</th>
    </tr>
  )
}

export default OrderRow
