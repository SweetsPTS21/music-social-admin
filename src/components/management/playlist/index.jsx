import React from 'react'
import PlaylistContextProvider from '../../../context/usePlaylistContext'
import UpdatePlaylistModal from './modal/update'
import PlaylistTable from './table'
import DeletePlaylistModal from './modal/delete'
import PlaylistToolbar from './toolbar'
import { Flex } from 'antd'

const PlaylistManagement = () => {
    return (
        <PlaylistContextProvider>
            <Flex vertical className={'h-full'}>
                <PlaylistToolbar />
                <PlaylistTable />
            </Flex>
            <UpdatePlaylistModal />
            <DeletePlaylistModal />
        </PlaylistContextProvider>
    )
}

export default PlaylistManagement
