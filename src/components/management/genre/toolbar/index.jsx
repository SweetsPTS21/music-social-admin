import React from 'react'
import { Button, Flex } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useGenreContext } from '../../../../context/useGenreContext'

const GenreToolbar = () => {
    const { isAdding, handleCreateGenre } = useGenreContext()
    const handleAdd = () => {
        handleCreateGenre({
            name: 'New Genre'
        })
    }

    return (
        <Flex
            justify={'space-between'}
            align={'center'}
            style={{
                marginBottom: 20
            }}
        >
            <h1>Movie Management</h1>
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
