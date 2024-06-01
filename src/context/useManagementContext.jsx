import React, {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useState
} from 'react'
import { getUsers } from '../api/user/api'
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
    const [allPlaylistLoading, setAllPlaylistLoading] = useState(false)

    const [allAlbums, setAllAlbums] = useState([])
    const [allAlbumsLoading, setAllAlbumsLoading] = useState(false)

    const [allUsers, setAllUsers] = useState([])
    const [allUsersLoading, setAllUsersLoading] = useState(false)

    const [searchText, setSearchText] = useState('')
    const [pageNumber, setPageNumber] = useState(0)
    const [pageSize, setPageSize] = useState(50)
    const [sortPage, setSortPage] = useState('createdDate,desc')

    const fetchUserData = useCallback(async (page, size, sort, searchText) => {
        setAllUsersLoading(true)
        try {
            const res = await getUsers({
                page: page || pageNumber,
                size: size || pageSize,
                sort: sort || sortPage,
                searchText: searchText || ''
            })
            setAllUsers(res)
        } catch (error) {
            console.error('Error fetching users:', error)
        } finally {
            setAllUsersLoading(false)
        }
    }, [])

    const fetchSongsData = useCallback(async (page, size, sort, searchText) => {
        setSongLoading(true)
        try {
            const res = await getSongs({
                page: page || pageNumber,
                size: size || pageSize,
                sort: sort || sortPage,
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
                    page: page || pageNumber,
                    size: size || pageSize,
                    sort: sort || sortPage,
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
                    page: page || pageNumber,
                    size: size || pageSize,
                    sort: sort || sortPage,
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
            setAllPlaylistLoading(true)
            try {
                const res = await getPlaylists({
                    page: page || pageNumber,
                    size: size || pageSize,
                    sort: sort || sortPage,
                    searchText: searchText || ''
                })
                setAllPlaylist(res)
            } catch (error) {
                console.error('Error fetching playlist:', error)
            } finally {
                setAllPlaylistLoading(false)
            }
        },
        []
    )

    const fetchAlbumData = useCallback(async (page, size, sort, searchText) => {
        setAllAlbumsLoading(true)
        try {
            const res = await getAlbums({
                page: page || pageNumber,
                size: size || pageSize,
                sort: sort || sortPage,
                searchText: searchText || ''
            })
            setAllAlbums(res)
        } catch (error) {
            console.error('Error fetching album:', error)
        } finally {
            setAllAlbumsLoading(false)
        }
    }, [])

    useEffect(() => {
        fetchUserData(pageNumber, pageSize, sortPage, searchText).then((r) => r)
        fetchSongsData(pageNumber, pageSize, sortPage, searchText).then(
            (r) => r
        )
        fetchArtistData(pageNumber, pageSize, sortPage, searchText).then(
            (r) => r
        )
        fetchSongGenres(pageNumber, pageSize, sortPage, searchText).then(
            (r) => r
        )
        fetchSongTags(pageNumber, pageSize, sortPage, searchText).then((r) => r)
        fetchPlaylistData(pageNumber, pageSize, sortPage, searchText).then(
            (r) => r
        )
        fetchAlbumData(pageNumber, pageSize, sortPage, searchText).then(
            (r) => r
        )
    }, [])

    const contextValue = useMemo(() => {
        return {
            authed: true,
            allUsers,
            allUsersLoading,
            fetchUserData,
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
            allPlaylistLoading,
            fetchPlaylistData,
            allAlbums,
            allAlbumsLoading,
            fetchAlbumData
        }
    }, [
        allUsers,
        allUsersLoading,
        allSongs,
        songLoading,
        allArtist,
        artistLoading,
        songGenres,
        genreLoading,
        songTags,
        tagLoading,
        allPlaylist,
        allPlaylistLoading,
        allAlbums,
        allAlbumsLoading
    ])

    return (
        <ManagementContext.Provider value={contextValue}>
            {children}
        </ManagementContext.Provider>
    )
}

export default ManagementContextProvider
