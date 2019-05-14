import { Order, ReduxTypes, Product } from 'src/@types/redux-types'
import { GET_ORDERS, UPDATE_LINE_ITEM, EMPTY_CART } from './actions'

const initialOrders: Array<Order> = []

export default (state = initialOrders, action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_ORDERS:
      state = action.orders
      return state

    case EMPTY_CART:
      return [...state.filter(order => order.status !== 'cart')]

    case UPDATE_LINE_ITEM:
      const testState: Order[] = JSON.parse(JSON.stringify(state))
      const cart = testState.find(order => order.status === 'cart')
      if (cart) {
        if (action.quantity === 0) {
          cart.products = cart.products.filter(product => product.id !== action.productId)
        } else {
          cart.products = cart.products.map(product => {
            if (product.id === action.productId) {
              product.OrdersProducts.quantity += action.quantity
            }

            return product
          })
        }

        const newState = [...testState.filter(order => order.status !== 'cart'), cart]
        console.log('state', state, 'newstate', newState)
        return newState
      } else {
        return state
      }

    default:
      return state
  }
}
