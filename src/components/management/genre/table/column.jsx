import { Button, Space } from 'antd'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import React from 'react'
import { useGenreContext } from '../../../../context/useGenreContext'

export const Columns = (
    tableParams,
    setTableParams,
    setData,
    changeEditModalState
) => {
    const { changeModalMode, changeDeleteModalState } = useGenreContext()

    const columns = [
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
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
