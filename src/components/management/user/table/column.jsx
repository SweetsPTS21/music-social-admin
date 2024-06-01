import { Button, Flex, Image, Space, Tooltip } from 'antd'
import {
    CheckCircleTwoTone,
    CloseCircleTwoTone,
    DeleteTwoTone,
    EditTwoTone
} from '@ant-design/icons'
import React from 'react'
import { useUserContext } from '../../../../context/useUserContext'
import defaultImg from '../../../../assets/img/200.png'
import { render } from '@testing-library/react'

export const Columns = (
    tableParams,
    setTableParams,
    setData,
    changeEditModalState
) => {
    const { changeModalMode, changeDeleteModalState } = useUserContext()

    const columns = [
        {
            title: 'Image',
            dataIndex: 'imageUrl',
            key: 'imageUrl',
            width: '10%',
            render: (imageUrl, record) => (
                <Image
                    src={imageUrl || defaultImg}
                    alt={'imageUrl'}
                    width={80}
                />
            )
        },
        {
            title: 'First Name',
            dataIndex: 'firstName',
            key: 'firstName',
            width: '15%'
        },
        {
            title: 'Last Name',
            dataIndex: 'lastName',
            key: 'lastName',
            width: '15%'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            width: '20%'
        },
        {
            title: 'Account',
            dataIndex: 'login',
            key: 'login',
            width: '10%',
            render: (login, record) => (
                <Flex gap={6} align="center">
                    <span style={{ textTransform: 'lowercase' }}>{login}</span>
                    <Tooltip
                        title={record?.activated ? 'Activated' : 'Deactivated'}
                        color={'#f50'}
                        key={login}
                        placement={'top'}
                    >
                        {record?.activated ? (
                            <CheckCircleTwoTone twoToneColor="#52c41a" />
                        ) : (
                            <CloseCircleTwoTone twoToneColor="#ff0000" />
                        )}
                    </Tooltip>
                </Flex>
            )
        },
        {
            title: 'Role',
            dataIndex: 'authorities',
            key: 'authorities',
            width: '20%',
            render: (authorities) => {
                return authorities?.map((authority) => authority).join(', ')
            }
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
