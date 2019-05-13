import React from 'react'
import { Product } from 'src/@types/redux-types'
import { connect } from 'react-redux'
import { putCartLineItem } from '../../../store/thunks'

const mapDispatchToProps = (dispatch: any) => ({
  updateCart: (productId: number, quantity: number) => dispatch(putCartLineItem(productId, quantity))
})

const OrderRow = ({ product, isCart, updateCart }: { product: Product; isCart: boolean; updateCart: any }) => {
  return (
    <tr>
      <th>{product.id}</th>
      <th>{product.name}</th>
      <th>{product.price}</th>
      <th>
        {isCart ? (
          <button type="button" className="btn btn-info" onClick={() => updateCart(product.id, -1)}>
            -
          </button>
        ) : null}
        {product.OrdersProducts.quantity}
        {isCart ? (
          <button type="button" className="btn btn-info" onClick={() => updateCart(product.id, 1)}>
            +
          </button>
        ) : null}
      </th>
    </tr>
  )
}

export default connect(
  null,
  mapDispatchToProps
)(OrderRow)
