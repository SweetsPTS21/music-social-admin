import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { getPlaylists } from '../api/playlist/api'

export const PlaylistContext = createContext(null)
export const usePlaylistContext = () => useContext(PlaylistContext)

const PlaylistContextProvider = ({ children }) => {
    const [allPlaylist, setAllPlaylist] = useState([])
    const [playlistLoading, setPlaylistLoading] = useState(false)

    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const [openDeleteModal, setOpenDeleteModal] = useState(false)
    const [deleteModalState, setDeleteModalState] = useState({})

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(50)
    const [sort, setSort] = useState('createdDate,desc')

    const fetchPlaylistData = useCallback(
        async (page, size, sort, searchText) => {
            setPlaylistLoading(true)
            try {
                const res = await getPlaylists({
                    page,
                    size,
                    sort,
                    searchText
                })
                setAllPlaylist(res)
            } catch (error) {
                console.error('Error fetching playlist:', error)
            } finally {
                setPlaylistLoading(false)
            }
        },
        []
    )

    useEffect(() => {
        fetchPlaylistData(page, size, sort, searchText).then((r) => r)
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
            allPlaylist,
            playlistLoading,
            fetchPlaylistData,
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
        allPlaylist,
        playlistLoading,
        openEditModal,
        editModalState,
        modalMode,
        openDeleteModal,
        deleteModalState
    ])

    return (
        <PlaylistContext.Provider value={contextValue}>
            {children}
        </PlaylistContext.Provider>
    )
}

export default PlaylistContextProvider
