import React from 'react'
import PlaylistContextProvider from '../../../context/usePlaylistContext'
import UpdatePlaylistModal from './modal/update'
import PlaylistTable from './table'
import DeletePlaylistModal from './modal/delete'
import PlaylistToolbar from './toolbar'

const PlaylistManagement = () => {
    return (
        <PlaylistContextProvider>
            <PlaylistToolbar />
            <PlaylistTable />
            <UpdatePlaylistModal />
            <DeletePlaylistModal />
        </PlaylistContextProvider>
    )
}

export default PlaylistManagement
