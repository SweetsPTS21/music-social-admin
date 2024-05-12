import React, { useState } from 'react'
import { Button, Flex, Modal, Typography } from 'antd'
import { WarningOutlined } from '@ant-design/icons'
import { useSongsContext } from '../../../../context/useSongsContext'
import { deleteSong } from '../../../../api/music/api'

const DeleteSongModal = () => {
    const { Text } = Typography
    const {
        openDeleteModal,
        deleteModalState: currentSong,
        changeDeleteModalState
    } = useSongsContext()
    const [deleteLoading, setDeleteLoading] = useState(false)

    console.log('currentSong', currentSong)

    const onOk = async () => {
        try {
            setDeleteLoading(true)
            // delete song
            const res = await deleteSong(currentSong?.id)
            if (res) {
                changeDeleteModalState({})
            }
        } catch (error) {
            console.error('Error deleting song:', error)
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
            <Text strong>Delete song</Text>
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
            <p>{`Are you sure you want to delete ${currentSong?.name}`}</p>
        </Modal>
    )
}

export default DeleteSongModal
