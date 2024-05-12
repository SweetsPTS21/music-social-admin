import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { getArtists } from '../api/artist/api'
import { getSongGenres, getSongTags } from '../api/music/api'

export const ManagementContext = createContext(null)
export const useManagementContext = () => useContext(ManagementContext)

const ManagementContextProvider = ({ children }) => {
    const [allArtist, setAllArtist] = useState([])
    const [artistLoading, setArtistLoading] = useState(false)

    const [songGenres, setSongGenres] = useState([])
    const [songTags, setSongTags] = useState([])

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
        fetchArtistData(page, size, sort, searchText).then((r) => r)
        fetchSongGenres(page, size, sort, searchText).then((r) => r)
        fetchSongTags(page, size, sort, searchText).then((r) => r)
    }, [])

    const contextValue = useMemo(() => {
        return {
            authed: true,
            allArtist,
            artistLoading,
            songGenres,
            fetchSongGenres,
            songTags,
            fetchSongTags
        }
    }, [allArtist, artistLoading, songGenres, songTags])

    return (
        <ManagementContext.Provider value={{}}>
            {children}
        </ManagementContext.Provider>
    )
}

export default ManagementContextProvider
