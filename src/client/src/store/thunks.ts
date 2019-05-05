import axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'

import store from './store'
import * as actions from './actions'
import { Product, Category } from 'src/@types/redux-types'

export const fetchProducts = () => {
  return (dispatch: any) => {
    return axios
      .get('/api/products')
      .then(res => res.data)
      .then((products: Array<Product>) => dispatch(actions.getProducts(products)))
  }
}

export const fetchProductsByCategory = (id: number) => {
  return (dispatch: any) => {
    return axios
      .get(`/api/categories/${id}/products`)
      .then(res => res.data)
      .then((category: Category) => dispatch(actions.getProducts(category.products)))
  }
}

export const fetchCategories = () => {
  return (dispatch: any) => {
    return axios
      .get('/api/categories')
      .then(res => res.data)
      .then((categories: Array<Category>) => dispatch(actions.getCategories(categories)))
  }
}
