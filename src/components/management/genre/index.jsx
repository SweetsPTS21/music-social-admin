import React from 'react'
import GenreContextProvider from '../../../context/useGenreContext'
import UpdateGenreModal from './modal/update'
import GenreTable from './table'
import DeleteGenreModal from './modal/delete'
import GenreToolbar from './toolbar'
import { Flex } from 'antd'

const GenreManagement = () => {
    return (
        <GenreContextProvider>
            <Flex vertical className={'h-full'}>
                <GenreToolbar />
                <GenreTable />
            </Flex>
            <UpdateGenreModal />
            <DeleteGenreModal />
        </GenreContextProvider>
    )
}

export default GenreManagement
