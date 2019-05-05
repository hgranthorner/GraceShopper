export namespace ReduxTypes {
  export interface Action {
    type: Symbol
    [data: string]: any
  }

  export type ActionCreator = (...args: any) => Action
}

export interface Product {
  id: number
  name: string
  price: number
  description: string
  imageUrl: string
  quantity: number
  categoryId: number
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
}
