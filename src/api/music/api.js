import { MS_axios } from '../../custom/axios'
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

export const createSong = async (user) => {
    return MS_axios.post(BASE_URL_SONGS, user)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const updateSong = async (user) => {
    return MS_axios.put(`${BASE_URL_SONGS}/${user.id}`, user)
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
    return MS_axios.post(`http://13.211.144.166:8080/files/upload`, formData)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}
