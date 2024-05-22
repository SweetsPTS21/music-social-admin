import { MS_axios } from '../../custom/axios'
import { BASE_PATH } from '../../config/url'

const BASE_URL_ALBUMS = `${BASE_PATH}/api/v1/albums`

export const getAlbums = async (params) => {
    return MS_axios.get(`${BASE_URL_ALBUMS}`, { params })
        .then((res) => {
            return res.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const getAlbum = async (id) => {
    return MS_axios.get(`${BASE_URL_ALBUMS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const createAlbum = async (data) => {
    return MS_axios.post(BASE_URL_ALBUMS, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const updateAlbum = async (id, data) => {
    return MS_axios.put(`${BASE_URL_ALBUMS}/${id}`, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const deleteAlbum = async (id) => {
    return MS_axios.delete(`${BASE_URL_ALBUMS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const addSongToAlbum = async (id, songId) => {
    return MS_axios.post(`${BASE_URL_ALBUMS}/${id}/songs/${songId}`, {})
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}
