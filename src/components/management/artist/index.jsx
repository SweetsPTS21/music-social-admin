import React from 'react'
import ArtistContextProvider from '../../../context/useArtistContext'
import UpdateArtistModal from './modal/update'
import ArtistTable from './table'
import DeleteArtistModal from './modal/delete'
import ArtistToolbar from './toolbar'
import { Flex } from 'antd'

const ArtistManagement = () => {
    return (
        <ArtistContextProvider>
            <Flex vertical className={'h-full'}>
                <ArtistToolbar />
                <ArtistTable />
            </Flex>
            <UpdateArtistModal />
            <DeleteArtistModal />
        </ArtistContextProvider>
    )
}

export default ArtistManagement
