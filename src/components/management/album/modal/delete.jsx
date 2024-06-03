import React, { useState } from 'react'
import { Button, Flex, Modal, Typography } from 'antd'
import { useAlbumContext } from '../../../../context/useAlbumContext'
import { deleteAlbum } from '../../../../api/album/api'
import { WarningOutlined } from '@ant-design/icons'

const DeleteAlbumModal = () => {
    const { Text } = Typography
    const {
        openDeleteModal,
        deleteModalState: currentAlbum,
        changeDeleteModalState
    } = useAlbumContext()
    const [deleteLoading, setDeleteLoading] = useState(false)

    const onOk = async () => {
        try {
            setDeleteLoading(true)
            const res = await deleteAlbum(currentAlbum?.id)
            if (res) {
                changeDeleteModalState({})
            }
        } catch (error) {
            console.error('Error deleting album:', error)
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
            <Text strong>Delete album</Text>
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
                <span style={{ color: '#0000EE' }}>{currentAlbum?.title}</span>
            </p>
        </Modal>
    )
}

export default DeleteAlbumModal
