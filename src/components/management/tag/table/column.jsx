import { Button, Flex, Image, Space, Tag } from 'antd'
import { getMovieTagColor } from '../../movie/utils'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import React from 'react'
import { useTagContext } from '../../../../context/useTagContext'

export const Columns = (
    tableParams,
    setTableParams,
    setData,
    changeEditModalState
) => {
    const { changeModalMode, changeDeleteModalState } = useTagContext()

    const columns = [
        {
            title: 'Tag',
            dataIndex: 'tag',
            key: 'tag',
            width: '10%'
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditTwoTone />}
                        onClick={() => {
                            changeModalMode('update')
                            changeEditModalState(record)
                        }}
                    />
                    <Button
                        icon={<DeleteTwoTone twoToneColor={'#ff0000'} />}
                        onClick={() => changeDeleteModalState(record)}
                    />
                </Space>
            )
        }
    ]

    return columns
}
