import { User, ReduxTypes } from 'src/@types/redux-types'
import { GET_USER } from './actions'

const initialUser: User = {
  id: -1,
  name: '',
  password: ''
}

export default (state: User = initialUser, action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_USER:
      state = action.user
      return state
    default:
      return state
  }
}
