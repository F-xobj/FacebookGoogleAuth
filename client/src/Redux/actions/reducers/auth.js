import {
  AUTH_SIGN_UP,
  AUTH_ERROR,
  AUTH_SIGN_OUT,
  AUTH_SIGN_IN,
  GET_SECRET,
} from '../types'

const initState = {
  isAuth: false,
  token: '',
  errorMessage: '',
  secret: '',
}
export default (state = initState, action) => {
  switch (action.type) {
    case AUTH_SIGN_UP:
      return {
        ...state,
        token: action.payload,
        isAuth: true,
        errorMessage: '',
      }
      break
    case AUTH_SIGN_IN:
      return {
        ...state,
        token: action.payload,
        isAuth: true,
        errorMessage: '',
      }
      break
    case AUTH_ERROR:
      return {
        ...state,
        errorMessage: action.payload,
      }
      break
    case AUTH_SIGN_OUT:
      return {
        ...state,
        errorMessage: '',
        isAuth: false,
        token: action.payload,
      }
      break

    case GET_SECRET:
      return { ...state, secret: action.payload }
      break

    default:
      break
  }

  return state
}
