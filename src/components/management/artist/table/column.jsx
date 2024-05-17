import { Button, Image, Space } from 'antd'
import { DeleteTwoTone, EditTwoTone } from '@ant-design/icons'
import React from 'react'
import { useArtistContext } from '../../../../context/useArtistContext'

export const Columns = (
    tableParams,
    setTableParams,
    setData,
    changeEditModalState
) => {
    const { changeModalMode, changeDeleteModalState } = useArtistContext()

    const columns = [
        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            width: '10%',
            render: (thumbnail, record) => (
                <Image src={thumbnail} alt={'thumbnail'} width={80} />
            )
        },
        {
            title: 'Nickname',
            dataIndex: 'nickname',
            key: 'nickname',
            width: '10%'
        },
        {
            title: 'Country',
            dataIndex: 'country',
            key: 'country',
            width: '10%'
        },
        {
            title: 'Description',
            dataIndex: 'description',
            key: 'description',
            width: '10%'
        },
        {
            title: 'Website',
            dataIndex: 'websiteUrl',
            key: 'websiteUrl',
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
