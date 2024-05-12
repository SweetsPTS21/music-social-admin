import React, { useState } from 'react'
import { Button, Flex, Modal, Typography } from 'antd'
import { useArtistContext } from '../../../../context/useArtistContext'
import { deleteArtist } from '../../../../api/artist/api'
import { WarningOutlined } from '@ant-design/icons'

const DeleteArtistModal = () => {
    const { Text } = Typography
    const {
        openDeleteModal,
        deleteModalState: currentArtist,
        changeDeleteModalState
    } = useArtistContext()
    const [deleteLoading, setDeleteLoading] = useState(false)

    const onOk = async () => {
        try {
            setDeleteLoading(true)
            // delete artist
            const res = await deleteArtist(currentArtist?.id)
            if (res) {
                changeDeleteModalState({})
            }
        } catch (error) {
            console.error('Error deleting artist:', error)
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
            <Text strong>Delete artist</Text>
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
                <span style={{ color: '#0000EE' }}>
                    {currentArtist?.nickname}
                </span>
            </p>
        </Modal>
    )
}

export default DeleteArtistModal
