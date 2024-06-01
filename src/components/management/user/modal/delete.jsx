import React, { useState } from 'react'
import { Button, Flex, Modal, Typography } from 'antd'
import { useUserContext } from '../../../../context/useUserContext'
import { deleteUser } from '../../../../api/user/api'
import { WarningOutlined } from '@ant-design/icons'

const DeleteUserModal = () => {
    const { Text } = Typography
    const {
        openDeleteModal,
        deleteModalState: currentUser,
        changeDeleteModalState
    } = useUserContext()
    const [deleteLoading, setDeleteLoading] = useState(false)

    const onOk = async () => {
        try {
            setDeleteLoading(true)
            // delete user
            const res = await deleteUser(currentUser?.id)
            if (res) {
                changeDeleteModalState({})
            }
        } catch (error) {
            console.error('Error deleting user:', error)
        } finally {
            setDeleteLoading(false)
        }
    }

    const onCancel = () => {
        changeDeleteModalState({})
    }

    const ModalTitle = () => (
        <Flex>
            <WarningOutlined
                style={{ color: 'red', fontSize: 20, marginRight: 10 }}
            />
            <Text strong>Delete user</Text>
        </Flex>
    )

    const ModalFooter = () => (
        <Flex gap={8} justify={'flex-end'}>
            <Button key="back" onClick={() => onCancel()}>
                Cancel
            </Button>
            <Button
                key="submit"
                type="primary"
                danger
                onClick={() => onOk()}
                loading={deleteLoading}
            >
                Delete
            </Button>
        </Flex>
    )

    return (
        <Modal
            title={<ModalTitle />}
            open={openDeleteModal}
            footer={<ModalFooter />}
            onCancel={() => onCancel()}
        >
            <p>
                {'Are you sure you want to delete'}{' '}
                <span style={{ color: '#0000EE' }}>{currentUser?.login}</span>
            </p>
        </Modal>
    )
}

export default DeleteUserModal
