import { Outlet, Route, Routes } from 'react-router-dom'
import AdminHome from '../index'
import ArtistManagement from '../artist'
import SongsManagement from '../movie'
import AlbumManagement from '../album'
import GenreManagement from '../genre'
import TagManagement from '../tag'
import PlaylistManagement from '../playlist'

export const ManagementRoute = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminHome />}>
                <Route path="/songs" element={<SongsManagement />}>
                    <Route path="/songs/:id" element={<SongsManagement />} />
                </Route>
                <Route path="/playlists" element={<PlaylistManagement />}>
                    <Route
                        path="/playlists/:id"
                        element={<PlaylistManagement />}
                    />
                </Route>
                <Route path="/albums" element={<AlbumManagement />}>
                    <Route path="/albums/:id" element={<AlbumManagement />} />
                </Route>
                <Route path="/artists" element={<ArtistManagement />}>
                    <Route path="/artists/:id" element={<ArtistManagement />} />
                </Route>
                <Route path="/genres" element={<GenreManagement />}>
                    <Route path="/genres/:id" element={<GenreManagement />} />
                </Route>
                <Route path="/tags" element={<TagManagement />}>
                    <Route path="/tags/:id" element={<TagManagement />} />
                </Route>
            </Route>
        </Routes>
    )
}
