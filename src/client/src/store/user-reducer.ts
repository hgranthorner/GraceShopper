import { User, ReduxTypes } from 'src/@types/redux-types'
import { GET_USER } from './actions'

const initialUser: User = {
  name: '',
  password: ''
}

export default (state: User = initialUser, action: ReduxTypes.Action) => {
  switch (action.type) {
    case GET_USER:
      return action.user
    default:
      return state
  }
}
