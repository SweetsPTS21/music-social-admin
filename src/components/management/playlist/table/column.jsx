import { Button, Flex, Image, Space, Tag } from 'antd'
import { getMovieTagColor } from '../../movie/utils'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import React from 'react'
import { usePlaylistContext } from '../../../../context/usePlaylistContext'

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
            width: '10%',
            render: (thumbnail, record) => (
                <Image src={thumbnail} alt={'thumbnail'} width={80} />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '10%'
        },
        {
            title: 'Date',
            dataIndex: 'createDate',
            key: 'createDate',
            width: '12%',
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
            width: '10%'
        },
        {
            title: 'Likes',
            dataIndex: 'likes',
            key: 'likes',
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
