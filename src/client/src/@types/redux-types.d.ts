export namespace ReduxTypes {
  export interface Action {
    type: Symbol
    [data: string]: any
  }

  export type ActionCreator = (...args: any) => Action
}

export interface Product {
  name: string
  price: number
  description: string
  imageUrl: string
  quantity: number
  categoryId: number
}

export interface User {
  name: string
  password: string
}

export interface Category {
  name: string
  description: string
}
