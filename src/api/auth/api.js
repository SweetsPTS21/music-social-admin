import { BASE_PATH } from '../../config/url'
import { MS_axios } from '../../custom/axios'

const BASE_URL_LOGIN = `${BASE_PATH}/api/authenticate`
const BASE_URL_TOKEN = `${BASE_PATH}/api/v1/auth/token`
const BASE_URL_ME = `${BASE_PATH}/api/account`
const BASE_URL_REFRESH_TOKEN = `${BASE_PATH}/api/v1/auth/refresh-token`
const BASE_URL_LOG_OUT = `${BASE_PATH}/api/v1/auth/logout`
const BASE_URL_SIGNUP = `${BASE_PATH}/api/v1/auth/register`

export const signUp = (firstName, lastName, email, password) => {
    return MS_axios.post(
        BASE_URL_SIGNUP,
        {
            firstName,
            lastName,
            email,
            password
        },
        {
            withCredentials: true
        }
    )
}

function setLanguage() {
    localStorage.setItem('language', 'vi')
}

export const signIn = (username, password, rememberMe) => {
    setLanguage()
    const language = localStorage.getItem('language')
    return MS_axios.post(
        BASE_URL_LOGIN,
        {
            username,
            password
        },
        {
            headers: {
                'Content-Type': 'application/json',
                'Accept-Language': language
            },
            withCredentials: true
        }
    )
}

export const getToken = (email) => {
    return MS_axios.post(
        BASE_URL_TOKEN,
        {
            email
        },
        {
            headers: {
                Accept: 'application/json'
            }
        }
    )
}

export const getMe = () => {
    return MS_axios.get(BASE_URL_ME, {
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${localStorage.getItem('jwtToken')}`
        },
        withCredentials: true
    })
}

export const refreshToken = (refreshtoken) => {
    return MS_axios.post(
        BASE_URL_REFRESH_TOKEN,
        {
            refreshTokenCode: refreshtoken
        },
        {
            withCredentials: true
        }
    )
}

export const logout = () => {
    return MS_axios.post(
        BASE_URL_LOG_OUT,
        {},
        {
            withCredentials: true
        }
    )
}
