import { MS_axios } from '../../custom/axios'
import { BASE_PATH } from '../../config/url'

const BASE_URL_USERS = `${BASE_PATH}/api/admin/users`
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

export const updateUser = async (user) => {
    return MS_axios.put(`${BASE_URL_USERS}/${user.id}`, user)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const deleteUser = async (id) => {
    return MS_axios.delete(`${BASE_URL_USERS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}
