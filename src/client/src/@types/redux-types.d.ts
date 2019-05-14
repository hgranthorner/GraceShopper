export namespace ReduxTypes {
  export interface Action {
    type: Symbol
    [data: string]: any
  }

  export type ActionCreator = (...args: any) => Action
}

export interface OrdersProduct {
  quantity: number
}

export interface Product {
  id: number
  name: string
  price: number
  description: string
  imageUrl: string
  quantity: number
  categoryId: number
  OrdersProducts: OrdersProduct
}

export interface User {
  id: number
  name: string
  password: string
}

export interface Category {
  id: number
  name: string
  description: string
  products: Array<Product>
}

export interface Order {
  id: number
  status: string
  userId: number
  products: Array<Product>
}

export interface cartOnSession {
  id: number
  status: string
  userId: number
  products: Array<Product>
  cartCount: number
}
