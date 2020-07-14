import axios from 'axios'
import { AUTH_SIGN_UP, AUTH_ERROR, AUTH_SIGN_OUT, AUTH_SIGN_IN, GET_SECRET } from './types'

export const signUp = data => {
    return async dispatch => {

        try {
            const res = await axios.post('http://localhost:3001/users/signup', data)
            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })
            localStorage.setItem('JWT_TOKEN', res.data.token)
            return res.data.token

        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            })
        }

    }
}

export const signIn = data => {
    return async dispatch => {

        try {
            const res = await axios.post('http://localhost:3001/users/signin', data)
            dispatch({
                type: AUTH_SIGN_IN,
                payload: res.data.token
            })
            localStorage.setItem('JWT_TOKEN', res.data.token)
            axios.defaults.headers.common['Authorization'] = res.data.token
            return res.data.token
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            })
        }

    }
}


export const oauthGoogle = data => {
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:3001/users/oauth/google', {
                access_token: data
            })
            localStorage.setItem('JWT_TOKEN', res.data.token)
            axios.defaults.headers.common['Authorization'] = res.data.token

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })
            return res.data.token
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            })
        }
    }
}

export const oauthFacebook = data => {
    return async dispatch => {
        try {
            const res = await axios.post('http://localhost:3001/users/oauth/facebook', {
                access_token: data
            })
            localStorage.setItem('JWT_TOKEN', res.data.token)
            axios.defaults.headers.common['Authorization'] = res.data.token

            dispatch({
                type: AUTH_SIGN_UP,
                payload: res.data.token
            })
            return res.data.token
        } catch (error) {
            dispatch({
                type: AUTH_ERROR,
                payload: 'Email is already in use'
            })
        }
    }
}


export const signOut = () => {
    return async dispatch => {
        localStorage.removeItem('JWT_TOKEN')
        axios.defaults.headers.common['Authorization'] = ''

        dispatch({
            type: AUTH_SIGN_OUT,
            payload: ""
        })

    }
}


export const getSecret = () => {
    return async dispatch => {
        try {
            const res = await axios.get('http://localhost:3001/users/secret')

            dispatch({
                type: GET_SECRET,
                payload: res.data.secret
            })

        } catch (error) {
            console.log("GetSecretError : ", error);


        }

    }
}