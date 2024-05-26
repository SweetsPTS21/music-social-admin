import React, { createContext, useContext, useMemo, useState } from 'react'
import { getPlaylist, getPlaylistSongs } from '../api/playlist/api'

export const PlaylistContext = createContext(null)
export const usePlaylistContext = () => useContext(PlaylistContext)

const PlaylistContextProvider = ({ children }) => {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    const [playlistLoading, setPlaylistLoading] = useState(false)
    const [playlistSongs, setPlaylistSongs] = useState([])

    const fetchPlaylist = _.debounce(async (id) => {
        setPlaylistLoading(true)
        const res = await getPlaylist(id)

        setEditModalState(mapPlaylistData(res))
        setPlaylistLoading(false)
    }, 300)

    const fetchPlaylistSongs = _.debounce(async (id) => {
        setPlaylistLoading(true)
        const res = await getPlaylistSongs(id)

        setPlaylistSongs(res)
        setPlaylistLoading(false)
    }, 300)

    const mapPlaylistData = (data) => {
        return {
            ...data,
            key: data.id,
            thumbnail: data?.thumbnail?.path
        }
    }

    const changeEditModalState = (data) => {
        setEditModalState(data)
        setOpenEditModal(!openEditModal)
    }

    const changeDeleteModalState = (data) => {
        setDeleteModalState(data)
        setOpenDeleteModal(!openDeleteModal)
    }

    const changeModalMode = (mode) => {
        setModalMode(mode)
    }

    const contextValue = useMemo(() => {
        return {
            openEditModal,
            editModalState,
            changeEditModalState,
            modalMode,
            changeModalMode,
            openDeleteModal,
            deleteModalState,
            changeDeleteModalState,
            playlistLoading,
            fetchPlaylist,
            playlistSongs,
            fetchPlaylistSongs
        }
    }, [
        openEditModal,
        editModalState,
        modalMode,
        openDeleteModal,
        deleteModalState,
        playlistLoading,
        playlistSongs
    ])

    return (
        <PlaylistContext.Provider value={contextValue}>
            {children}
        </PlaylistContext.Provider>
    )
}

export default PlaylistContextProvider
