import axios from 'axios'
import Cookies from 'js-cookie'
import { message, notification } from 'antd'
import { BASE_PATH } from '../../config/url'

export const MS_axios = axios.create({
    baseURL: BASE_PATH,
    headers: {
        'Content-Type': 'application/json'
    }
})

// Add request interceptor (optional)
MS_axios.interceptors.request.use(
    (config) => {
        // Do something before each request (e.g., add auth headers)
        const token = localStorage.getItem('jwtToken') // Example: Retrieve token from storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error)
    }
)

// Add response interceptor (optional)
MS_axios.interceptors.response.use(
    (response) => {
        // Do something with successful responses (e.g., handle data)
        return response
    },
    (error) => {
        // Handle response errors (e.g., handle errors gracefully)
        // ignore if path is /login
        console.log('error', error)

        if (
            error?.response?.status === 401 &&
            !error?.config?.url.includes('/authenticate')
        ) {
            // Handle unauthorized errors (e.g., redirect to login)
            // clear localStorage
            window.localStorage.clear()

            //clear cookies
            Cookies.remove('accessToken')

            // redirect to login
            window.location.href = '/login'

            notification.error({
                message: 'Error',
                description: 'Token expired, please login again'
            })
        } else {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.detail
            })
        }

        if (!error?.response) {
            // Handle network errors (e.g., display error message)
            console.log('Network Error', error)
            message.error('Network Error').then((r) => r)
        }
        return Promise.reject(error)
    }
)

export const MS_formAxios = axios.create({
    baseURL: BASE_PATH,
    headers: {
        'Content-Type': 'multipart/form-data'
    }
})

// Add request interceptor (optional)
MS_formAxios.interceptors.request.use(
    (config) => {
        // Do something before each request (e.g., add auth headers)
        const token = localStorage.getItem('jwtToken') // Example: Retrieve token from storage
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    (error) => {
        // Handle request errors
        return Promise.reject(error)
    }
)

// Add response interceptor (optional)
MS_formAxios.interceptors.response.use(
    (response) => {
        // Do something with successful responses (e.g., handle data)
        return response
    },
    (error) => {
        // Handle response errors (e.g., handle errors gracefully)
        // ignore if path is /login
        console.log('error', error)

        if (
            error?.response?.status === 401 &&
            !error?.config?.url.includes('/authenticate')
        ) {
            // Handle unauthorized errors (e.g., redirect to login)
            // clear localStorage
            window.localStorage.clear()

            //clear cookies
            Cookies.remove('accessToken')

            // redirect to login
            window.location.href = '/login'

            notification.error({
                message: 'Error',
                description: 'Token expired, please login again'
            })
        } else {
            notification.error({
                message: 'Error',
                description: error?.response?.data?.detail
            })
        }

        if (!error?.response) {
            // Handle network errors (e.g., display error message)
            console.log('Network Error', error)
            message.error('Network Error').then((r) => r)
        }
        return Promise.reject(error)
    }
)
