import React from 'react'
import { Button, Flex } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useAlbumContext } from '../../../../context/useAlbumContext'

const AlbumToolbar = () => {
    const { changeEditModalState, changeModalMode } = useAlbumContext()

    return (
        <Flex
            justify={'space-between'}
            align={'center'}
            style={{
                marginBottom: 20
            }}
        >
            <h1>Albums Management</h1>
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

export default AlbumToolbar
