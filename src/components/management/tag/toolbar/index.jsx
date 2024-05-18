import React from 'react'
import { Button, Flex } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useTagContext } from '../../../../context/useTagContext'

const TagToolbar = () => {
    const { isAdding, handleCreateTag } = useTagContext()
    const handleAdd = () => {
        handleCreateTag({
            name: 'New Tag'
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
