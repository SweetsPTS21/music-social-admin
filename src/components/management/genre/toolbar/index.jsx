import React from 'react'
import { Button, Flex, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useGenreContext } from '../../../../context/useGenreContext'
import { useManagementContext } from '../../../../context/useManagementContext'

const { Search } = Input

const GenreToolbar = () => {
    const { setSearchText, fetchSongGenres } = useManagementContext()
    const { isAdding, handleCreateGenre, changeEditModalState, setModalMode } =
        useGenreContext()
    const handleAdd = () => {
        setModalMode('add')
        changeEditModalState({})
    }

    const handleSearch = (value) => {
        setSearchText(value)
        fetchSongGenres(0, 50, 'createdDate,desc', value)
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
            <Button
                type="primary"
                icon={<PlusOutlined />}
                onClick={handleAdd}
                disabled={isAdding}
            >
                Add
            </Button>
        </Flex>
    )
}

export default GenreToolbar
