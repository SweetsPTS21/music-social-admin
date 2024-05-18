import React from 'react'
import { Button, Flex } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useSongsContext } from '../../../../context/useSongsContext'

const Toolbar = () => {
    const { changeEditModalState, changeModalMode } = useSongsContext()

    return (
        <Flex
            justify={'space-between'}
            align={'center'}
            style={{
                marginBottom: 20
            }}
        >
            <h1>Songs Management</h1>
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

export default Toolbar
