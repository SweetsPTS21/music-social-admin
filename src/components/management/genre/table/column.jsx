import { Button, Space, Typography } from 'antd'
import { DeleteTwoTone } from '@ant-design/icons'
import React from 'react'
import { useGenreContext } from '../../../../context/useGenreContext'

const { Paragraph } = Typography

export const Columns = () => {
    const { changeDeleteModalState, handleUpdateGenre } = useGenreContext()

    const handleChange = (record, value) => {
        if (record?.tag === value) return
        handleUpdateGenre(record?.id, { name: value })
    }

    const columns = [
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            width: '10%',
            render: (text, record) => (
                <Paragraph
                    editable={{
                        onChange: handleChange.bind(this, record),
                        text: text
                    }}
                    ellipsis={{
                        suffix: text
                    }}
                />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
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
