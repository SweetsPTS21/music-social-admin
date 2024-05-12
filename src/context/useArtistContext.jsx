import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { getArtists } from '../api/artist/api'

export const ArtistContext = createContext(null)
export const useArtistContext = () => useContext(ArtistContext)

const ArtistContextProvider = ({ children }) => {
    const [allArtist, setAllArtist] = useState([])
    const [artistLoading, setArtistLoading] = useState(false)

    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(50)
    const [sort, setSort] = useState('createdDate,desc')

    const fetchArtistData = useCallback(
        async (page, size, sort, searchText) => {
            setArtistLoading(true)
            try {
                const res = await getArtists({
                    page,
                    size,
                    sort,
                    searchText
                })
                setAllArtist(res)
            } catch (error) {
                console.error('Error fetching artist:', error)
            } finally {
                setArtistLoading(false)
            }
        },
        []
    )

    useEffect(() => {
        fetchArtistData(page, size, sort, searchText).then((r) => r)
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
            allArtist,
            artistLoading,
            fetchArtistData,
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
        allArtist,
        artistLoading,
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
