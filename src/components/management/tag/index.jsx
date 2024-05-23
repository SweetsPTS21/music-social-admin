import React from 'react'
import TagContextProvider from '../../../context/useTagContext'
import UpdateTagModal from './modal/update'
import TagTable from './table'
import DeleteTagModal from './modal/delete'
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
