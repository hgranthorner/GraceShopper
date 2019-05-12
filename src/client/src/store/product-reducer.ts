import { Product, ReduxTypes } from 'src/@types/redux-types'
import { GET_PRODUCT } from './actions'

const initialProduct: Product = {
  id: -1,
  name: '',
  price: -1,
  description: '',
  quantity: -1,
  imageUrl: '',
  categoryId: -1,
  OrdersProducts: {
    quantity: -1
  }
}

export default (state: Product = initialProduct, action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_PRODUCT:
      return action.product
    default:
      return state
  }
}
