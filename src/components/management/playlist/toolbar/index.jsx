import React from 'react'
import { Button, Flex } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { usePlaylistContext } from '../../../../context/usePlaylistContext'

const PlaylistToolbar = () => {
    const { changeEditModalState, changeModalMode } = usePlaylistContext()

    return (
        <Flex
            justify={'space-between'}
            align={'center'}
            style={{
                marginBottom: 20
            }}
        >
            <h1>Playlist Management</h1>
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={() => {
                    if (changeEditModalState) {
                        changeModalMode('add')
                        changeEditModalState({})
                    }
                }}
            >
                Add
            </Button>
        </Flex>
    )
}

export default PlaylistToolbar
