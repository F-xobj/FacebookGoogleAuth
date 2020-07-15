import { combineReducers } from 'redux'
import authReducers from './auth'
import dashboardReducers from './dashboard'

export default combineReducers({
  auth: authReducers,
  dashboard: dashboardReducers,
})
