import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { getSongGenres, getSongs, getSongTags } from '../api/music/api'
import { MS_axios } from '../custom/axios'
import { BASE_PATH } from '../config/url'

export const SongsContext = createContext(null)
export const useSongsContext = () => useContext(SongsContext)
const BASE_URL_SONGS = `${BASE_PATH}/api/v1/songs`

const SongsContextProvider = ({ children }) => {
    const [allSongs, setAllSongs] = useState([])
    const [songLoading, setSongLoading] = useState(false)
    const [openEditModal, setOpenEditModal] = useState(false)
    const [editModalState, setEditModalState] = useState({})
    const [modalMode, setModalMode] = useState(null)

    const [songGenres, setSongGenres] = useState([])
    const [songTags, setSongTags] = useState([])

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(50)
    const [sort, setSort] = useState('id,desc')

    const fetchSongsData = useCallback(async (page, size, sort, searchText) => {
        setSongLoading(true)
        try {
            const res = await getSongs({
                page,
                size,
                sort,
                searchText
            })
            setAllSongs(res)
        } catch (error) {
            console.error('Error fetching songs:', error)
        } finally {
            setSongLoading(false)
        }
    }, [])

    const fetchSongGenres = useCallback(
        async (page, size, sort, searchText) => {
            try {
                const res = await getSongGenres({
                    page,
                    size,
                    sort,
                    searchText
                })
                setSongGenres(res)
            } catch (error) {
                console.error('Error fetching song genres:', error)
            }
        },
        []
    )

    const fetchSongTags = useCallback(async (page, size, sort, searchText) => {
        try {
            const res = await getSongTags({ page, size, sort, searchText })
            setSongTags(res)
        } catch (error) {
            console.error('Error fetching song tags:', error)
        }
    }, [])

    useEffect(() => {
        fetchSongsData(page, size, sort, searchText).then((r) => r)
        fetchSongGenres(page, size, sort, searchText).then((r) => r)
        fetchSongTags(page, size, sort, searchText).then((r) => r)
    }, [])

    const changeEditModalState = (data) => {
        setEditModalState(data)
        setOpenEditModal(!openEditModal)
    }

    const changeModalMode = (mode) => {
        setModalMode(mode)
    }

    const contextValue = useMemo(() => {
        return {
            allSongs,
            songLoading,
            openEditModal,
            editModalState,
            modalMode,
            changeEditModalState,
            changeModalMode,
            fetchSongsData,
            songGenres,
            songTags
        }
    }, [
        allSongs,
        songLoading,
        openEditModal,
        editModalState,
        modalMode,
        songGenres,
        songTags
    ])

    return (
        <SongsContext.Provider value={contextValue}>
            {children}
        </SongsContext.Provider>
    )
}

export default SongsContextProvider
