import { GET_SECRET } from '../types'

const initState = {
  secret: '',
}
export default (state = initState, action) => {
  switch (action.type) {
    case GET_SECRET:
      return { ...state, secret: action.payload }
      break

    default:
      break
  }

  return state
}
