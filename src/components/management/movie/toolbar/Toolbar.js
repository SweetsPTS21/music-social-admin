import React from 'react'
import { Button, Flex, Input } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { useSongsContext } from '../../../../context/useSongsContext'
import { useManagementContext } from '../../../../context/useManagementContext'

const { Search } = Input

const Toolbar = () => {
    const { setSearchText, fetchSongsData } = useManagementContext()
    const { changeEditModalState, changeModalMode } = useSongsContext()

    const handleSearch = (value) => {
        setSearchText(value)
        fetchSongsData(0, 50, 'createdDate,desc', value)
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
            <h1>Songs Management</h1>
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

export default Toolbar
