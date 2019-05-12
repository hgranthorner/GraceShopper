import { GET_CART_COUNT } from './actions'
import { ReduxTypes } from 'src/@types/redux-types'

export default (state: number = 0, action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_CART_COUNT:
      return action.count
    default:
      return state
  }
}
