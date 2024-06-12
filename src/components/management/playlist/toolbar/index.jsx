import React from 'react'
import { Button, Flex, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { usePlaylistContext } from '../../../../context/usePlaylistContext'
import { useManagementContext } from '../../../../context/useManagementContext'

const { Search } = Input

const PlaylistToolbar = () => {
    const { setSearchText, fetchPlaylistData } = useManagementContext()
    const { changeEditModalState, changeModalMode } = usePlaylistContext()

    const handleSearch = (value) => {
        setSearchText(value)
        fetchPlaylistData(0, 50, 'createdDate,desc', value)
    }

    return (
        <Flex
            justify={'space-between'}
            align={'center'}
            style={{
                marginBottom: 20
            }}
            gap={20}
        >
            <h1>Playlist Management</h1>
            <Search
                placeholder="Search"
                onSearch={handleSearch}
                allowClear
                enterButton
                style={{ maxWidth: 800 }}
            />
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
