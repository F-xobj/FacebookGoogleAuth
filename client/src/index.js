import React from "react";
import ReactDOM from "react-dom";
import axios from 'axios'
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Route } from "react-router-dom";
import App from "./components/app";
import Dashboard from "./components/dashboard";
import Home from "./components/Home";
import SignOut from "./components/Signout";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import { createStore, applyMiddleware } from "redux";
import reduxThunk from 'redux-thunk'
import { Provider } from "react-redux";
import reducers from "./reducers/index";
import authGuard from "./HOCs/authGuard"

const jwtToken = localStorage.getItem('JWT_TOKEN')
axios.defaults.headers.common['Authorization'] = jwtToken
ReactDOM.render(
  <Provider store={createStore(reducers, {
    auth: {
      token: jwtToken,
      isAuth: jwtToken ? true : false
    }
  }, applyMiddleware(reduxThunk))}>
    <BrowserRouter>
      <App>
        <Route path="/signup" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/signout" exact component={authGuard(SignOut)} />
        <Route path="/" exact component={Home} />
        <Route path="/dashboard" exact component={authGuard(Dashboard)} />


      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
