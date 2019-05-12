import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

import user from './user-reducer'
import categories from './categories-reducer'
import products from './products-reducer'
import product from './product-reducer'
import searchTerm from './searchTerm-reducer'
import orders from './orders-reducer'
import cartCount from './cart-count-reducer'

const store = createStore(
  combineReducers({ user, categories, products, product, searchTerm, orders, cartCount }),
  applyMiddleware(thunkMiddleware)
)

export default store
