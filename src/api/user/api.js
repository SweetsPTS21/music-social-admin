import { MS_axios, MS_formAxios } from '../../custom/axios'
import { BASE_PATH } from '../../config/url'

const BASE_URL_USERS = `${BASE_PATH}/api/admin/users`
const BASE_URL_USERS_UPGRADE = `${BASE_PATH}/api/account/upgrade-artist`

export const getUsers = async (params) => {
    return MS_axios.get(BASE_URL_USERS, { params })
        .then((res) => {
            return res.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const getUser = async (id) => {
    return MS_axios.get(`${BASE_URL_USERS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const createUser = async (user) => {
    return MS_axios.post(BASE_URL_USERS, user)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const updateUser = async (userId, data) => {
    return MS_formAxios.put(`${BASE_URL_USERS}/${userId}`, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const deleteUser = async (userId) => {
    return MS_axios.delete(`${BASE_URL_USERS}/${userId}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const upgradeUser = async (key, data) => {
    return MS_formAxios.post(`${BASE_URL_USERS_UPGRADE}/${key}`, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const getUpgradeUserKey = async (email) => {
    return MS_axios.post(`${BASE_URL_USERS_UPGRADE}`, email, {
        headers: {
            'Content-Type': 'text/plain'
        }
    })
}
