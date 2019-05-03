// types

const GET_PRODUCTS = Symbol('redux get products')

// creators

const getProducts: ReduxTypes.ActionCreator = (products: Array<any>) => ({ type: GET_PRODUCTS, products })
