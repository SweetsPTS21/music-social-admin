import { Button, Image, Space, Typography } from 'antd'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import React from 'react'
import { useGenreContext } from '../../../../context/useGenreContext'
import defaultImg from '../../../../assets/img/200.png'

const { Paragraph } = Typography

export const Columns = () => {
    const {
        changeDeleteModalState,
        changeEditModalState,
        setModalMode,
        handleUpdateGenre
    } = useGenreContext()

    // const handleChange = (record, value) => {
    //     if (record?.tag === value) return
    //     handleUpdateGenre(record?.id, { name: value })
    // }

    const handleEdit = (record) => {
        changeEditModalState(record)
        setModalMode('update')
    }

    const columns = [
        {
            title: 'Genre',
            dataIndex: 'genre',
            key: 'genre',
            width: '20%',
            render: (text, record) => (
                <Paragraph
                    ellipsis={{
                        suffix: text
                    }}
                />
            )
        },
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: '20%',
            render: (thumbnail, record) => (
                <Image
                    src={thumbnail || defaultImg}
                    alt={'thumbnail'}
                    width={80}
                />
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <Space size="middle">
                    <Button
                        icon={<EditTwoTone twoToneColor={'#1890ff'} />}
                        onClick={() => handleEdit(record)}
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
