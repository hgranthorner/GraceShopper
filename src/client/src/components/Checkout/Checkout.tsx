import React, { useEffect } from 'react'
import { Order, User } from 'src/@types/redux-types'
import { fetchOrder } from '../../store'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { checkoutOrder } from '../../store'

const mapStateToProps = ({ order, user }: { order: Order; user: User }) => ({ order, user })

const mapDispatchToProps = (dispatch: any) => ({
  fetchOrder: (id: number) => dispatch(fetchOrder(id)),
  checkoutOrder: (id: number) => dispatch(checkoutOrder(id))
})

const Checkout = ({
  checkoutOrder,
  fetchOrder,
  match,
  user,
  history,
  order
}: {
  checkoutOrder: any
  fetchOrder: any
  match: any
  user: User
  history: any
  order: Order
}) => {
  useEffect(() => {
    fetchOrder(match.params.orderId)
  }, [])

  const totalCost = order ? order.products.reduce((acc: number, product) => product.quantity * product.price, 0) : 0
  const isLoggedIn = user.id === -1 ? false : true
  const checkout = () => {
    checkoutOrder(order.id)
      .then(() => {
        history.push('/')
      })
      .catch((e: Error) => console.error(`Failed to checkout.\n${e}`))
  }

  return (
    <div className="d-flex flex-column align-items-center mt-5">
      <h3>Total cost will be: ${totalCost}</h3>
      <button type="button" className={`btn btn-lg btn-raised btn-success mt-5 ${isLoggedIn ? '' : 'disabled'}`} onClick={checkout}>
        CONFIRM
      </button>
      {isLoggedIn ? '' : <Link to="/login">Oops! It doesn't look like you're logged in. Please log in here.</Link>}
    </div>
  )
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Checkout)
