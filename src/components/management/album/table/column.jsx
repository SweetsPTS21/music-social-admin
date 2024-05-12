import { Button, Flex, Image, Space, Tag } from 'antd'
import { getMovieTagColor } from '../../movie/utils'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import React from 'react'
import { useAlbumContext } from '../../../../context/useAlbumContext'

export const Columns = (
    tableParams,
    setTableParams,
    setData,
    changeEditModalState
) => {
    const { changeModalMode, changeDeleteModalState } = useAlbumContext()

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
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            width: '10%'
        },
        {
            title: 'Caption',
            dataIndex: 'caption',
            key: 'caption',
            width: '10%'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '20%'
        },
        {
            title: 'Publish Date',
            dataIndex: 'publishDate',
            key: 'publishDate',
            width: '10%'
        },
        {
            title: 'Artist',
            dataIndex: 'artist',
            key: 'artist',
            width: '10%',
            render: (text, record) => (
                <Flex direction="column">
                    <span>{text?.name}</span>
                </Flex>
            )
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
