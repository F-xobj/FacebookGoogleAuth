import { combineReducers } from "redux";
import { reducer as formReducer } from "redux-form";
import authReducers from './auth'
import dashboardReducers from "./dashboard";

export default combineReducers({
  form: formReducer,
  auth: authReducers,
  dashboard: dashboardReducers
});
