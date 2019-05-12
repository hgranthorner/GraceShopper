import React from 'react'
import { Product } from 'src/@types/redux-types'

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
      <tbody>
        {order.length > 0
          ? order.map((item: Product) => (
              <tr key={item.id}>
                <th>{item.id}</th>
                <th>{item.name}</th>
                <th>{item.price}</th>
                <th>{item.quantity}</th>
              </tr>
            ))
          : null}
      </tbody>
    </table>
  )
}

export default OrderDataTable
