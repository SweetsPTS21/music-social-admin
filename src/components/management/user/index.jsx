import React from 'react'
import UserContextProvider from '../../../context/useUserContext'
import UpdateUserModal from './modal/update'
import UserTable from './table'
import DeleteUserModal from './modal/delete'
import UserToolbar from './toolbar'
import { Flex } from 'antd'

const UserManagement = () => {
    return (
        <UserContextProvider>
            <Flex vertical className={'h-full'}>
                <UserToolbar />
                <UserTable />
            </Flex>
            <UpdateUserModal />
            <DeleteUserModal />
        </UserContextProvider>
    )
}

export default UserManagement
