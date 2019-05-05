import { Category, ReduxTypes } from 'src/@types/redux-types'
import { GET_CATEGORIES } from './actions'

export default (state: Array<Category> = [], action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_CATEGORIES:
      return action.categories
    default:
      return state
  }
}
