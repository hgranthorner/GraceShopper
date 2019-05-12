import { Product, Category, ReduxTypes, User, Order } from 'src/@types/redux-types'

// types

export const GET_PRODUCTS = Symbol('redux get products')
export const GET_USER = Symbol('redux get user')
export const GET_CATEGORIES = Symbol('redux get categories')
export const GET_PRODUCT = Symbol('redux get a product')
export const GET_ORDER = Symbol('redux get order')
export const GET_ORDERS = Symbol('redux get orders')
export const GET_CART_COUNT = Symbol('redux get cart count')
export const UPDATE_SEARCHTERM = Symbol('redux update searchterm')

// action creators

export const getProducts: ReduxTypes.ActionCreator = (products: Array<Product>) => ({ type: GET_PRODUCTS, products })
export const getUser: ReduxTypes.ActionCreator = (user: User) => ({
  type: GET_USER,
  user
})
export const getCategories: ReduxTypes.ActionCreator = (categories: Array<Category>) => ({ type: GET_CATEGORIES, categories })
export const getProduct: ReduxTypes.ActionCreator = (product: Product) => ({
  type: GET_PRODUCT,
  product
})
export const getOrder: ReduxTypes.ActionCreator = (order: Order) => ({
  type: GET_ORDER,
  order
})
export const getOrders = (orders: Array<Order>) => ({
  type: GET_ORDERS,
  orders
})
export const getCartCount: ReduxTypes.ActionCreator = (count: number) => ({
  type: GET_CART_COUNT,
  count
})

export const updateSearchTerm: ReduxTypes.ActionCreator = (searchTerm: string) => ({ type: UPDATE_SEARCHTERM, searchTerm })
