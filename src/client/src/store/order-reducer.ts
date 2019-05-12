import { Order, ReduxTypes } from 'src/@types/redux-types'
import { GET_ORDER } from './actions'

const initialOrder: Order = {
  id: -1,
  status: 'cart',
  userId: -1,
  products: []
}

export default (state = initialOrder, action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_ORDER:
      state = action.order
      return state
    default:
      return state
  }
}
