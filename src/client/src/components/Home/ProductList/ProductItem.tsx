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
      dispatch(loggedInAddToOrder(userId, product)),
    guestAddToOrder: (product: Product) => dispatch(createOrder(product))
  }
}

const ProductItem = ({
  user,
  order,
  product,
  guestAddToOrder,
  userAddToOrder
}: {
  user: User
  order: Order
  product: Product
  guestAddToOrder: any
  userAddToOrder: any
}) => {
  const deleteProduct = () => {
    return
  }
  return (
    <div className="border mb-2">
      <div className="row">
        <div className="col product-image">
          <img
            alt="A picture of a product"
            src={product.imageUrl}
            className="col pt-1 pb-1 pl-1"
          />
        </div>
        <div className="col d-flex align-items-around justify-content-center flex-column">
          <div className="row d-flex align-items-center justify-content-around">
            <Link to={`/products/${product.id}`}>
              <h3>{product.name}</h3>
            </Link>
            <h6>
              <span>${product.price}</span>
            </h6>
          </div>
          <div className="row">
            <div className="d-flex flex-row align-items-center">
              <div className="col">
                <p>{product.description}</p>
              </div>
              <div className="col">
                <div className="btn-group">
                  <button
                    className={'btn btn-success'}
                    onClick={() =>
                      user.id === -1
                        ? guestAddToOrder(product)
                        : userAddToOrder(user.id, product)
                    }
                  >
                    +Cart
                  </button>
                  <Link to={`/products/update/${product.id}`}>
                    <button className="btn btn-info" type="button">
                      Update
                    </button>
                  </Link>
                  <button className="btn btn-danger" type="button">
                    Remove
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductItem)
