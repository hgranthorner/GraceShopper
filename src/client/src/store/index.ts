import store from './store'
import {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  fetchProduct,
  fetchOrders,
  fetchOrder,
  searchProducts,
  checkIfLoggedIn,
  addItemToCart,
  logout,
  checkoutOrder,
  fetchCartCount
} from './thunks'
import { updateSearchTerm } from './actions'

export default store
export {
  fetchProducts,
  fetchCategories,
  fetchProductsByCategory,
  fetchProduct,
  fetchOrders,
  fetchOrder,
  updateSearchTerm,
  searchProducts,
  checkIfLoggedIn,
  addItemToCart,
  logout,
  checkoutOrder,
  fetchCartCount
}
