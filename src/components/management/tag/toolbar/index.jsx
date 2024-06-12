import React from 'react'
import { Button, Flex, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTagContext } from '../../../../context/useTagContext'
import { useManagementContext } from '../../../../context/useManagementContext'

const { Search } = Input

const TagToolbar = () => {
    const { setSearchText, fetchSongTags } = useManagementContext()
    const { isAdding, handleCreateTag } = useTagContext()

    const handleAdd = () => {
        handleCreateTag({
            name: 'New Tag ' + Math.floor(Math.random() * 1000)
        })
    }

    const handleSearch = (value) => {
        setSearchText(value)
        fetchSongTags(0, 50, 'createdDate,desc', value)
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
            <h1>Movie Management</h1>
            <Search
                placeholder="Search"
                onSearch={handleSearch}
                allowClear
                enterButton
                style={{ maxWidth: 800 }}
            />
            <Flex gap={16}>
                <Button
                    type="primary"
                    icon={<PlusOutlined />}
                    onClick={handleAdd}
                    disabled={isAdding}
                >
                    Add
                </Button>
            </Flex>
        </Flex>
    )
}

export default TagToolbar
