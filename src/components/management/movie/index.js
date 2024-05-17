import React from 'react'
import Toolbar from './toolbar/Toolbar'
import UserContextProvider from '../../../context/useSongsContext'
import UpdateSongModal from './modal'
import SongsTable from './table'
import DeleteSongModal from './modal/delelte'

const SongsManagement = () => {
    return (
        <UserContextProvider>
            <Toolbar />
            <SongsTable />
            <UpdateSongModal />
            <DeleteSongModal />
        </UserContextProvider>
    )
}

export default SongsManagement
