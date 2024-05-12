import React from 'react'
import GenreContextProvider from '../../../context/useGenreContext'
import UpdateGenreModal from './modal/update'
import GenreTable from './table'
import DeleteGenreModal from './modal/delete'
import GenreToolbar from './toolbar'

const GenreManagement = () => {
    return (
        <GenreContextProvider>
            <GenreToolbar />
            <GenreTable />
            <UpdateGenreModal />
            <DeleteGenreModal />
        </GenreContextProvider>
    )
}

export default GenreManagement
