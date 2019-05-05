import axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'

import store from './store'
import * as actions from './actions'
import { Product } from 'src/@types/redux-types'

export const fetchProducts = () => {
  return (dispatch: any) => {
    return axios
      .get('/api/products')
      .then(res => res.data)
      .then((products: Array<Product>) => dispatch(actions.getProducts(products)))
  }
}
