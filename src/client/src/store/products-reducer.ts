import { Product, ReduxTypes } from 'src/@types/redux-types'
import { GET_PRODUCTS } from './actions'

export default (state: Array<Product> = [], action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_PRODUCTS:
      return action.products
    default:
      return state
  }
}
