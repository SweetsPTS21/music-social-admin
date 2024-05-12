import React, {
    createContext,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { useManagementContext } from './useManagementContext'

export const ArtistContext = createContext(null)
export const useArtistContext = () => useContext(ArtistContext)

const ArtistContextProvider = ({ children }) => {
    const { allArtist } = useManagementContext()
    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const artistId = window.location.pathname.split('/').pop()

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    useEffect(() => {
        if (artistId && allArtist.length > 0) {
            const findArtist = allArtist?.find(
                (artist) => artist.id === Number(artistId)
            )
            if (findArtist) {
                changeEditModalState({
                    ...findArtist,
                    image: findArtist?.image?.path
                })
                changeModalMode('update')
            }
        }
    }, [artistId, allArtist])

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
        <ArtistContext.Provider value={contextValue}>
            {children}
        </ArtistContext.Provider>
    )
}

export default ArtistContextProvider
