import store from './store'
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  fetchProduct,
  searchProducts,
  createOrder,
  loggedInAddToOrder
} from './thunks'
import { updateSearchTerm } from './actions'

export default store
export {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  fetchProduct,
  updateSearchTerm,
  searchProducts,
  createOrder,
  loggedInAddToOrder
}
