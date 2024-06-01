import { MS_axios, MS_formAxios } from '../../custom/axios'
import { BASE_PATH } from '../../config/url'

const BASE_URL_PLAYLISTS = `${BASE_PATH}/api/v1/playlists`

export const getPlaylists = async (params) => {
    return MS_axios.get(`${BASE_URL_PLAYLISTS}`, { params })
        .then((res) => {
            return res.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const getPlaylist = async (id) => {
    return MS_axios.get(`${BASE_URL_PLAYLISTS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const createPlaylist = async (data) => {
    return MS_formAxios.post(BASE_URL_PLAYLISTS, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const updatePlaylist = async (id, data) => {
    return MS_formAxios.put(`${BASE_URL_PLAYLISTS}/${id}`, data)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const deletePlaylist = async (id) => {
    return MS_axios.delete(`${BASE_URL_PLAYLISTS}/${id}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const getPlaylistSongs = async (id) => {
    return MS_axios.get(`${BASE_URL_PLAYLISTS}/${id}/songs`)
        .then((res) => {
            return res.data || []
        })
        .catch((err) => {
            console.log(err)
            return []
        })
}

export const addSongToPlaylist = async (playlistId, songId) => {
    return MS_axios.post(`${BASE_URL_PLAYLISTS}/${playlistId}/songs/${songId}`)
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}

export const removeSongFromPlaylist = async (playlistId, songId) => {
    return MS_axios.delete(
        `${BASE_URL_PLAYLISTS}/${playlistId}/songs/${songId}`
    )
        .then((res) => {
            return res.data || {}
        })
        .catch((err) => {
            console.log(err)
            return {}
        })
}
