import React from 'react'
import Toolbar from './toolbar/Toolbar'
import UserContextProvider from '../../../context/useSongsContext'
import UpdateSongModal from './modal'
import SongsTable from './table'

const MovieManagement = () => {
    return (
        <UserContextProvider>
            <Toolbar />
            <SongsTable />
            <UpdateSongModal />
        </UserContextProvider>
    )
}

export default MovieManagement
