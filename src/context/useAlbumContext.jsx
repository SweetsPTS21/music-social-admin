import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { getAlbums } from '../api/album/api'

export const AlbumContext = createContext(null)
export const useAlbumContext = () => useContext(AlbumContext)

const AlbumContextProvider = ({ children }) => {
    const [allAlbums, setAllAlbums] = useState([])
    const [albumLoading, setAlbumLoading] = useState(false)

    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(50)
    const [sort, setSort] = useState('createdDate,desc')

    const fetchAlbumData = useCallback(async (page, size, sort, searchText) => {
        setAlbumLoading(true)
        try {
            const res = await getAlbums({
                page,
                size,
                sort,
                searchText
            })
            setAllAlbums(res)
        } catch (error) {
            console.error('Error fetching album:', error)
        } finally {
            setAlbumLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchAlbumData(page, size, sort, searchText).then((r) => r)
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
            allAlbums,
            albumLoading,
            fetchAlbumData,
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
        allAlbums,
        albumLoading,
        openEditModal,
        editModalState,
        modalMode,
        openDeleteModal,
        deleteModalState
    ])

    return (
        <AlbumContext.Provider value={contextValue}>
            {children}
        </AlbumContext.Provider>
    )
}

export default AlbumContextProvider
