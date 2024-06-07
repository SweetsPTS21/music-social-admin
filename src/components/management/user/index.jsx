import React from 'react'
import UserContextProvider from '../../../context/useUserContext'
import UpdateUserModal from './modal/update'
import UpgradeArtistModal from './modal/upgrade'
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
            <UpgradeArtistModal />
        </UserContextProvider>
    )
}

export default UserManagement
