import React from 'react'
import ArtistContextProvider from '../../../context/useArtistContext'
import UpdateArtistModal from './modal/update'
import ArtistTable from './table'
import DeleteArtistModal from './modal/delete'
import ArtistToolbar from './toolbar'

const ArtistManagement = () => {
    return (
        <ArtistContextProvider>
            <ArtistToolbar />
            <ArtistTable />
            <UpdateArtistModal />
            <DeleteArtistModal />
        </ArtistContextProvider>
    )
}

export default ArtistManagement
