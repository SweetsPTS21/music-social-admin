import { MS_axios, MS_formAxios } from '../../custom/axios'
import { BASE_PATH } from '../../config/url'

const BASE_URL_SONGS = `${BASE_PATH}/api/v1/songs`
const BASE_URL_SONGS_GENRES = `${BASE_PATH}/api/v1/genres`
const BASE_URL_SONGS_TAGS = `${BASE_PATH}/api/v1/tags`
const BASE_URL_SONGS_UPLOAD = `${BASE_PATH}/files/upload`

export const getSongs = async (params) => {
    return MS_axios.get(BASE_URL_SONGS, { params })
        .then((res) => {
            return res?.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const getSong = async (id) => {
    return MS_axios.get(`${BASE_URL_SONGS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const createSong = async (data) => {
    return MS_formAxios.post(BASE_URL_SONGS, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const updateSong = async (id, data) => {
    return MS_formAxios.put(`${BASE_URL_SONGS}/${id}`, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const deleteSong = async (id) => {
    return MS_axios.delete(`${BASE_URL_SONGS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const getSongGenres = async (params) => {
    return MS_axios.get(`${BASE_URL_SONGS_GENRES}`, { params })
        .then((res) => {
            return res.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const getSongTags = async (params) => {
    return MS_axios.get(`${BASE_URL_SONGS_TAGS}`, { params })
        .then((res) => {
            return res.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const uploadThumbnail = async (file) => {
    const formData = new FormData()
    formData.append('file', file)
    return MS_axios.post(`${BASE_URL_SONGS_UPLOAD}`, formData)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}
