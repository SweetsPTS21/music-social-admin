import React from 'react'
import AlbumContextProvider from '../../../context/useAlbumContext'
import UpdateAlbumModal from './modal/update'
import AlbumTable from './table'
import DeleteAlbumModal from './modal/delete'
import AlbumToolbar from './toolbar'

const AlbumManagement = () => {
    return (
        <AlbumContextProvider>
            <AlbumToolbar />
            <AlbumTable />
            <UpdateAlbumModal />
            <DeleteAlbumModal />
        </AlbumContextProvider>
    )
}

export default AlbumManagement
