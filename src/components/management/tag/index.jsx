import React from 'react'
import TagContextProvider from '../../../context/useTagContext'
import UpdateTagModal from './modal/update'
import TagTable from './table'
import DeleteTagModal from './modal/delete'
import TagToolbar from './toolbar'

const TagManagement = () => {
    return (
        <TagContextProvider>
            <TagTable />
            <UpdateTagModal />
            <DeleteTagModal />
        </TagContextProvider>
    )
}

export default TagManagement
