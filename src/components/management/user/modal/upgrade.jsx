import React, { useState } from 'react'
import { Button, Flex, Modal, Typography, message } from 'antd'
import { useUserContext } from '../../../../context/useUserContext'
import { getUpgradeUserKey } from '../../../../api/user/api'
import { InfoCircleTwoTone, WarningOutlined } from '@ant-design/icons'

const UpgradeArtistModal = () => {
    const { Text } = Typography
    const { openUpgradeModal, currentUser, setOpenUpgradeModal } =
        useUserContext()
    const [deleteLoading, setDeleteLoading] = useState(false)

    const onOk = async () => {
        try {
            setDeleteLoading(true)
            // delete user
            const res = await getUpgradeUserKey(currentUser?.email)
            if (res?.status === 200) {
                message.success('Approve successfully')
            }
        } catch (error) {
            console.error('Error upgrade user:', error)
        } finally {
            setDeleteLoading(false)
            setOpenUpgradeModal(false)
        }
    }

    const onCancel = () => {
        setOpenUpgradeModal(false)
    }

    const ModalTitle = () => (
        <Flex>
            <InfoCircleTwoTone
                twoToneColor={'#1890ff'}
                style={{ color: 'red', fontSize: 20, marginRight: 10 }}
            />
            <Text strong>Upgrade artist</Text>
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
                Upgrade
            </Button>
        </Flex>
    )

    return (
        <Modal
            title={<ModalTitle />}
            open={openUpgradeModal}
            footer={<ModalFooter />}
            onCancel={() => onCancel()}
        >
            <p>
                {'Are you sure you want to approve upgrade artist request for'}{' '}
                <span style={{ color: '#0000EE' }}>{currentUser?.login}</span>
            </p>
        </Modal>
    )
}

export default UpgradeArtistModal
