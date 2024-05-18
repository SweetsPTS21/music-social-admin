import React, { useState } from 'react'
import { Button, Flex, Modal, Typography } from 'antd'
import { useGenreContext } from '../../../../context/useGenreContext'
import { useManagementContext } from '../../../../context/useManagementContext'
import { deleteGenre } from '../../../../api/genre/api'
import { WarningOutlined } from '@ant-design/icons'

const DeleteGenreModal = () => {
    const { Text } = Typography
    const {
        openDeleteModal,
        deleteModalState: currentGenre,
        changeDeleteModalState
    } = useGenreContext()
    const { fetchSongGenres } = useManagementContext()
    const [deleteLoading, setDeleteLoading] = useState(false)

    const onOk = async () => {
        try {
            setDeleteLoading(true)
            // delete playlist
            const res = await deleteGenre(currentGenre?.id)
            if (res) {
                changeDeleteModalState({})
                fetchSongGenres()
            }
        } catch (error) {
            console.error('Error deleting genre:', error)
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
                <span style={{ color: '#0000EE' }}>{currentGenre?.genre}</span>
            </p>
        </Modal>
    )
}

export default DeleteGenreModal
