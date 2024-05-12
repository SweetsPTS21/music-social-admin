import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { getGenres } from '../api/genre/api'

export const GenreContext = createContext(null)
export const useGenreContext = () => useContext(GenreContext)

const GenreContextProvider = ({ children }) => {
    const [allGenre, setAllGenre] = useState([])
    const [genreLoading, setGenreLoading] = useState(false)

    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(50)
    const [sort, setSort] = useState('createdDate,desc')

    const fetchGenreData = useCallback(async (page, size, sort, searchText) => {
        setGenreLoading(true)
        try {
            const res = await getGenres({
                page,
                size,
                sort,
                searchText
            })
            setAllGenre(res)
        } catch (error) {
            console.error('Error fetching genre:', error)
        } finally {
            setGenreLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchGenreData(page, size, sort, searchText).then((r) => r)
    }, [])

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
            allGenre,
            genreLoading,
            fetchGenreData,
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
        allGenre,
        genreLoading,
        openEditModal,
        editModalState,
        modalMode,
        openDeleteModal,
        deleteModalState
    ])

    return (
        <GenreContext.Provider value={contextValue}>
            {children}
        </GenreContext.Provider>
    )
}

export default GenreContextProvider
