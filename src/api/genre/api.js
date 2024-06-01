import { MS_axios, MS_formAxios } from '../../custom/axios'
import { BASE_PATH } from '../../config/url'

const BASE_URL_GENRES = `${BASE_PATH}/api/v1/genres`

export const getGenres = async (params) => {
    return MS_axios.get(`${BASE_URL_GENRES}`, { params })
        .then((res) => {
            return res.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const getGenre = async (id) => {
    return MS_axios.get(`${BASE_URL_GENRES}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const createGenre = async (data) => {
    return MS_formAxios.post(BASE_URL_GENRES, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const updateGenre = async (id, data) => {
    return MS_formAxios.put(`${BASE_URL_GENRES}/${id}`, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const deleteGenre = async (id) => {
    return MS_axios.delete(`${BASE_URL_GENRES}?ids=${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}
