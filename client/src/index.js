import React from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'
import { BrowserRouter, Route } from 'react-router-dom'
import './assets/sass/main.scss'
import App from './components/app'
import Dashboard from './components/Dashboard/Dashboard'
import SignIn from './components/Logged/SignIn'
import SignUp from './components/Logged/SignUp'
import { createStore, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import { Provider } from 'react-redux'
import reducers from './Redux/actions/reducers/index'
import authGuard from './HOCs/authGuard'

const jwtToken = localStorage.getItem('JWT_TOKEN')
axios.defaults.headers.common['Authorization'] = jwtToken
ReactDOM.render(
  <Provider
    store={createStore(
      reducers,
      {
        auth: {
          token: jwtToken,
          isAuth: jwtToken ? true : false,
        },
      },
      applyMiddleware(reduxThunk),
    )}
  >
    <BrowserRouter>
      <App>
        <Route path="/" exact component={SignUp} />
        <Route path="/signin" exact component={SignIn} />
        <Route path="/dashboard" exact component={authGuard(Dashboard)} />
      </App>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'),
)
