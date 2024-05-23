import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { getArtists } from '../api/artist/api'
import { getSongGenres, getSongs, getSongTags } from '../api/music/api'
import { getPlaylists } from '../api/playlist/api'
import { getAlbums } from '../api/album/api'

export const ManagementContext = createContext(null)
export const useManagementContext = () => useContext(ManagementContext)

const ManagementContextProvider = ({ children }) => {
    const [allSongs, setAllSongs] = useState([])
    const [songLoading, setSongLoading] = useState(false)

    const [allArtist, setAllArtist] = useState([])
    const [artistLoading, setArtistLoading] = useState(false)

    const [songGenres, setSongGenres] = useState([])
    const [genreLoading, setGenreLoading] = useState(false)

    const [songTags, setSongTags] = useState([])
    const [tagLoading, setTagLoading] = useState(false)

    const [allPlaylist, setAllPlaylist] = useState([])
    const [playlistLoading, setPlaylistLoading] = useState(false)

    const [allAlbums, setAllAlbums] = useState([])
    const [albumLoading, setAlbumLoading] = useState(false)

    const [searchText, setSearchText] = useState('')
    const [page, setPage] = useState(0)
    const [size, setSize] = useState(50)
    const [sort, setSort] = useState('createdDate,desc')

    const fetchSongsData = useCallback(async (page, size, sort, searchText) => {
        setSongLoading(true)
        try {
            const res = await getSongs({
                page,
                size,
                sort,
                searchText: searchText || ''
            })
            setAllSongs(res)
        } catch (error) {
            console.error('Error fetching songs:', error)
        } finally {
            setSongLoading(false)
        }
    }, [])

    const fetchArtistData = useCallback(
        async (page, size, sort, searchText) => {
            setArtistLoading(true)
            try {
                const res = await getArtists({
                    page,
                    size,
                    sort,
                    searchText: searchText || ''
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
            setGenreLoading(true)
            try {
                const res = await getSongGenres({
                    page,
                    size,
                    sort: sort || 'createdDate,desc',
                    searchText: searchText || ''
                })
                setSongGenres(res)
            } catch (error) {
                console.error('Error fetching song genres:', error)
            } finally {
                setGenreLoading(false)
            }
        },
        []
    )

    const fetchSongTags = useCallback(async (page, size, sort, searchText) => {
        try {
            setTagLoading(true)
            const res = await getSongTags({ page, size, sort, searchText })
            setSongTags(res)
        } catch (error) {
            console.error('Error fetching song tags:', error)
        } finally {
            setTagLoading(false)
        }
    }, [])

    const fetchPlaylistData = useCallback(
        async (page, size, sort, searchText) => {
            setPlaylistLoading(true)
            try {
                const res = await getPlaylists({
                    page,
                    size,
                    sort,
                    searchText: searchText || ''
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

    const fetchAlbumData = useCallback(async (page, size, sort, searchText) => {
        setAlbumLoading(true)
        try {
            const res = await getAlbums({
                page,
                size,
                sort,
                searchText: searchText || ''
            })
            setAllAlbums(res)
        } catch (error) {
            console.error('Error fetching album:', error)
        } finally {
            setAlbumLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchSongsData(page, size, sort, searchText).then((r) => r)
        fetchArtistData(page, size, sort, searchText).then((r) => r)
        fetchSongGenres(page, size, sort, searchText).then((r) => r)
        fetchSongTags(page, size, sort, searchText).then((r) => r)
        fetchPlaylistData(page, size, sort, searchText).then((r) => r)
        fetchAlbumData(page, size, sort, searchText).then((r) => r)
    }, [])

    const contextValue = useMemo(() => {
        return {
            authed: true,
            allSongs,
            songLoading,
            fetchSongsData,
            allArtist,
            artistLoading,
            songGenres,
            genreLoading,
            fetchSongGenres,
            songTags,
            tagLoading,
            fetchSongTags,
            allPlaylist,
            playlistLoading,
            fetchPlaylistData,
            allAlbums,
            albumLoading,
            fetchAlbumData
        }
    }, [
        allSongs,
        songLoading,
        allArtist,
        artistLoading,
        songGenres,
        genreLoading,
        songTags,
        tagLoading,
        allPlaylist,
        playlistLoading,
        allAlbums,
        albumLoading
    ])

    return (
        <ManagementContext.Provider value={contextValue}>
            {children}
        </ManagementContext.Provider>
    )
}

export default ManagementContextProvider
