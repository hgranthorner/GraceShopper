import { ReduxTypes } from 'src/@types/redux-types'
import { UPDATE_SEARCHTERM } from './actions'

const searchTerm = (state = '', action: ReduxTypes.Action) => {
  switch (action.type) {
    case UPDATE_SEARCHTERM:
      return action.searchTerm
    default:
      return state
  }
}

export default searchTerm
