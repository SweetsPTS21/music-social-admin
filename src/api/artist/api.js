import { MS_axios, MS_formAxios } from '../../custom/axios'
import { BASE_PATH } from '../../config/url'

const BASE_URL_ARTISTS = `${BASE_PATH}/api/v1/artists`

export const getArtists = async (params) => {
    return MS_axios.get(`${BASE_URL_ARTISTS}`, { params })
        .then((res) => {
            return res.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const getArtist = async (id) => {
    return MS_axios.get(`${BASE_URL_ARTISTS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const createArtist = async (data) => {
    return MS_formAxios.post(BASE_URL_ARTISTS, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const updateArtist = async (id, data) => {
    return MS_formAxios.put(`${BASE_URL_ARTISTS}/${id}`, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const deleteArtist = async (id) => {
    return MS_axios.delete(`${BASE_URL_ARTISTS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}
