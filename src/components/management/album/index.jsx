import React from 'react'
import AlbumContextProvider from '../../../context/useAlbumContext'
import UpdateAlbumModal from './modal/update'
import AlbumTable from './table'
import DeleteAlbumModal from './modal/delete'
import AlbumToolbar from './toolbar'
import { Flex } from 'antd'

const AlbumManagement = () => {
    return (
        <AlbumContextProvider>
            <Flex vertical className={'h-full'}>
                <AlbumToolbar />
                <AlbumTable />
            </Flex>
            <UpdateAlbumModal />
            <DeleteAlbumModal />
        </AlbumContextProvider>
    )
}

export default AlbumManagement
