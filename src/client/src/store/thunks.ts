import axios from 'axios'
import { ThunkDispatch } from 'redux-thunk'

import store from './store'
import * as actions from './actions'
import { User, Product, Category } from 'src/@types/redux-types'

export const fetchProducts = () => {
  return (dispatch: any) => {
    return axios
      .get('/api/products')
      .then(res => res.data)
      .then((products: Array<Product>) => dispatch(actions.getProducts(products)))
  }
}

export const searchProducts = () => {
  return (dispatch: any) => {
    return axios
      .get(`/api/products/search/${store.getState().searchTerm}`)
      .then(res => res.data)
      .then((products: Array<Product>) => {
        console.log('products')
        dispatch(actions.getProducts(products))
      })
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

export const fetchProduct = (id: number) => {
  return (dispatch: any) => {
    return axios
      .get(`/api/products/${id}`)
      .then(res => res.data)
      .then((product: Product) => dispatch(actions.getProduct(product)))
  }
}

export const fetchLoggedInUser = () => {
  return (dispatch: any) => {
    return axios
      .get('auth/user')
      .then(res => res.data)
      .then((user: User) => dispatch(actions.getUser(user)))
  }
}

export const login = ({ name, password }: { name: string; password: string }) => {
  return (dispatch: any) => {
    return axios
      .put('/auth/login', { name, password })
      .then(res => res.data)
      .then((user: User) => dispatch(actions.getUser(user)))
  }
}
