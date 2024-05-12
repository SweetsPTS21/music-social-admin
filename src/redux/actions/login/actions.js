import { loginTypes } from './Types'

export const getTokenStart = (email) => ({
    type: loginTypes.GET_TOKEN_REQUEST,
    email
})

export const updateUsernamePassword = (username, password) => ({
    type: loginTypes.UPDATE_USERNAME_PASSWORD,
    username,
    password
})

export const getTokenSuccess = () => ({
    type: loginTypes.GET_TOKEN_SUCCESS
})

export const getTokenError = (error) => ({
    type: loginTypes.GET_TOKEN_ERROR,
    error: error
})

export const loginStart = ({ email, password, rememberMe }) => ({
    type: loginTypes.REQUEST,
    email,
    password,
    rememberMe,
    loggedInSuccess: false
})

export const loginSuccess = (user) => ({
    type: loginTypes.SUCCESS,
    user: user,
    loggedInSuccess: true
})

export const loginError = (error) => ({
    type: loginTypes.FAILURE,
    error: error,
    loginSuccess: false
})

export const logoutStart = () => ({
    type: loginTypes.LOGOUT
})

export const clearLogin = () => ({
    type: loginTypes.CLEAR_LOGIN_DATA
})
