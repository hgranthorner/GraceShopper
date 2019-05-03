declare namespace ReduxTypes {
  export interface Action {
    type: Symbol
    [data: string]: any
  }

  export type ActionCreator = (...args: any) => Action
}
