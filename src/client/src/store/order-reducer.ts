import { Order, ReduxTypes } from 'src/@types/redux-types'
import { GET_ORDERS } from './actions'

const initialOrder: Array<Order> = []

export default (state = initialOrder, action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_ORDERS:
      state = action.orders
      return state
    default:
      return state
  }
}
