import store from './store'
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  fetchProduct,
  searchProducts,
  checkIfLoggedIn,
  addItemToCart,
  logout
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
  checkIfLoggedIn,
  addItemToCart,
  logout
}
