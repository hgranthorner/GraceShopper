import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import axios from 'axios'

import user from './user-reducer'
import categories from './categories-reducer'
import products from './products-reducer'
import product from './product-reducer'

const store = createStore(combineReducers({ user, categories, products, product }), applyMiddleware(thunkMiddleware))

const x = (a: number, b: number): number => a + b

// console.log(x)

export default store
