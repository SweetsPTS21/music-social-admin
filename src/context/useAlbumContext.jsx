import React, { createContext, useContext, useMemo, useState } from 'react'
import { getAlbum } from '../api/album/api'
import _ from 'lodash'

export const AlbumContext = createContext(null)
export const useAlbumContext = () => useContext(AlbumContext)

const AlbumContextProvider = ({ children }) => {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    const [albumLoading, setAlbumLoading] = useState(false)

    const fetchAlbum = _.debounce(async (id) => {
        setAlbumLoading(true)
        const res = await getAlbum(id)

        setEditModalState(mapAlbumData(res))
        setAlbumLoading(false)
    }, 500)

    const mapAlbumData = (data) => {
        return {
            ...data,
            key: data.id,
            thumbnail: data?.thumbnail?.path,
            artistIds: [data?.artist?.id]
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
            fetchAlbum,
            modalMode,
            changeModalMode,
            openDeleteModal,
            deleteModalState,
            changeDeleteModalState,
            albumLoading
        }
    }, [
        openEditModal,
        editModalState,
        modalMode,
        openDeleteModal,
        deleteModalState,
        albumLoading
    ])

    return (
        <AlbumContext.Provider value={contextValue}>
            {children}
        </AlbumContext.Provider>
    )
}

export default AlbumContextProvider
