import React, {
    createContext,
    useCallback,
    useContext,
    useMemo,
    useState
} from 'react'
import { useManagementContext } from './useManagementContext'
import { createGenre, updateGenre } from '../api/genre/api'

export const GenreContext = createContext(null)
export const useGenreContext = () => useContext(GenreContext)

const GenreContextProvider = ({ children }) => {
    const { fetchSongGenres } = useManagementContext()

    const [genreCreating, setGenreCreating] = useState(false)
    const [genreUpdating, setGenreUpdating] = useState(false)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    const changeDeleteModalState = (data) => {
        setDeleteModalState(data)
        setOpenDeleteModal(!openDeleteModal)
    }

    const handleCreateGenre = useCallback((data) => {
        setGenreCreating(true)
        createGenre(data)
            .then((res) => {
                if (res?.id) {
                    fetchSongGenres()
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setGenreCreating(false)
            })
    }, [])

    const handleUpdateGenre = useCallback((id, data) => {
        setGenreUpdating(true)
        updateGenre(id, data)
            .then((res) => {
                if (res?.id) {
                    fetchSongGenres()
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                setGenreUpdating(false)
            })
    }, [])

    const contextValue = useMemo(() => {
        return {
            openDeleteModal,
            deleteModalState,
            changeDeleteModalState,
            genreCreating,
            genreUpdating,
            handleCreateGenre,
            handleUpdateGenre
        }
    }, [openDeleteModal, deleteModalState, genreUpdating, genreCreating])

    return (
        <GenreContext.Provider value={contextValue}>
            {children}
        </GenreContext.Provider>
    )
}

export default GenreContextProvider
