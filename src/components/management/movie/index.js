import React from 'react'
import Toolbar from './toolbar/Toolbar'
import UserContextProvider from '../../../context/useSongsContext'
import UpdateSongModal from './modal'
import SongsTable from './table'
import DeleteSongModal from './modal/delelte'
import { Flex } from 'antd'

const SongsManagement = () => {
    return (
        <UserContextProvider>
            <Flex vertical className={'h-full'}>
                <Toolbar />
                <SongsTable />
            </Flex>
            <UpdateSongModal />
            <DeleteSongModal />
        </UserContextProvider>
    )
}

export default SongsManagement
