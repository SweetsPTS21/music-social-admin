import React, { useState } from 'react'
import { Button, Flex, Modal, Typography } from 'antd'
import { usePlaylistContext } from '../../../../context/usePlaylistContext'
import { deletePlaylist } from '../../../../api/playlist/api'
import { WarningOutlined } from '@ant-design/icons'

const DeletePlaylistModal = () => {
    const { Text } = Typography
    const {
        openDeleteModal,
        deleteModalState: currentPlaylist,
        changeDeleteModalState
    } = usePlaylistContext()
    const [deleteLoading, setDeleteLoading] = useState(false)

    const onOk = async () => {
        try {
            setDeleteLoading(true)
            // delete playlist
            const res = await deletePlaylist(currentPlaylist?.id)
            if (res) {
                changeDeleteModalState({})
            }
        } catch (error) {
            console.error('Error deleting playlist:', error)
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
            <Text strong>Delete playlist</Text>
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
                onClick={() => onOk()}
                loading={deleteLoading}
                danger
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
                <span style={{ color: '#0000EE' }}>
                    {currentPlaylist?.name}
                </span>
            </p>
        </Modal>
    )
}

export default DeletePlaylistModal
