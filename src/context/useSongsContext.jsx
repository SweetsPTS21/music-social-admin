import React, { createContext, useContext, useMemo, useState } from 'react'

export const SongsContext = createContext(null)
export const useSongsContext = () => useContext(SongsContext)

const SongsContextProvider = ({ children }) => {
    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

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
            modalMode,
            changeEditModalState,
            changeModalMode,
            openDeleteModal,
            deleteModalState,
            changeDeleteModalState
        }
    }, [
        openEditModal,
        editModalState,
        modalMode,
        openDeleteModal,
        deleteModalState
    ])

    return (
        <SongsContext.Provider value={contextValue}>
            {children}
        </SongsContext.Provider>
    )
}

export default SongsContextProvider
