import { Button, Flex, Image, Space } from 'antd'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import React from 'react'
import { usePlaylistContext } from '../../../../context/usePlaylistContext'
import defaultImg from '../../../../assets/img/200.png'

export const Columns = (
    tableParams,
    setTableParams,
    setData,
    changeEditModalState
) => {
    const { changeModalMode, changeDeleteModalState } = usePlaylistContext()

    const columns = [
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
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '20%'
        },
        {
            title: 'Date',
            dataIndex: 'createDate',
            key: 'createDate',
            width: '20%',
            render: (text, record) => (
                <Flex direction="column">
                    <span>{text}</span>
                </Flex>
            )
        },
        {
            title: 'Creator',
            dataIndex: 'creator',
            key: 'creator',
            width: '15%'
        },
        {
            title: 'Likes',
            dataIndex: 'likes',
            key: 'likes',
            width: '15%'
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
