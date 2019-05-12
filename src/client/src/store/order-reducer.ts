import { Order, ReduxTypes } from 'src/@types/redux-types'
import { GET_ORDER } from './actions'

const initialOrder: Order = {
  id: -1,
  isCart: false,
  userId: -1
}

export default (state: Order = initialOrder, action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_ORDER:
      state = action.order
      return state
    default:
      return state
  }
}
