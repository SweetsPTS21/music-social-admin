import { MS_axios } from '../../custom/axios'
import { BASE_PATH } from '../../config/url'

const BASE_URL_TAGS = `${BASE_PATH}/api/v1/tags`

export const getTags = async (params) => {
    return MS_axios.get(`${BASE_URL_TAGS}`, { params })
        .then((res) => {
            return res.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const getTag = async (id) => {
    return MS_axios.get(`${BASE_URL_TAGS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const createTag = async (data) => {
    return MS_axios.post(BASE_URL_TAGS, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const updateTag = async (id, data) => {
    return MS_axios.put(`${BASE_URL_TAGS}/${id}`, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const deleteTag = async (id) => {
    return MS_axios.delete(`${BASE_URL_TAGS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}
