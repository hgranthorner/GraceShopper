import React from 'react'
import { User, Product, Order } from 'src/@types/redux-types'
import { Link } from 'react-router-dom'
import { createOrder, loggedInAddToOrder } from '../../../store'
import { connect } from 'react-redux'

const mapStateToProps = ({ user, order }: { user: User; order: Order }) => {
  return { user, order }
}

const mapDispatchToProps = (dispatch: any) => {
  return {
    userAddToOrder: (userId: number, product: Product) =>
      dispatch(loggedInAddToOrder(userId, product))
  }
}

const ProductItem = ({
  user,
  order,
  product,
  userAddToOrder
}: {
  user: User
  order: Order
  product: Product
  userAddToOrder: any
}) => {
  const deleteProduct = () => {
    return
  }
  return (
    <div className="border mb-2">
      <div className="row">
        <div className="col">
          <Link to={`/products/${product.id}`}>
            <h3>{product.name}</h3>
          </Link>
          <h6>
            <span>${product.price}</span>
          </h6>
        </div>
        <div className="col d-flex flex-row-reverse align-items-center">
          <div className="btn-group">
            <button
              className={'btn btn-success'}
              onClick={() =>
                user.id === -1
                  ? createOrder(product)
                  : userAddToOrder(user.id, product)
              }
            >
              +Cart
            </button>
            <Link to={`/products/update/${product.id}`}>
              <button className={'btn btn-info'} type={'button'}>
                Update
              </button>
            </Link>
            <button
              className={'btn btn-danger'}
              type={'button'}
              onClick={() => deleteProduct()}
            >
              Remove
            </button>
          </div>
        </div>
      </div>
      <div className="row">
        <img
          alt={'A picture of a product'}
          src={product.imageUrl}
          className={'col'}
        />
        <p className={'col'}>{product.description}</p>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem)
