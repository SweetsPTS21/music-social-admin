import React from 'react'
import { Avatar, Dropdown, Flex, Typography } from 'antd'
import { LogoutOutlined, UserOutlined } from '@ant-design/icons'
import { useDispatch } from 'react-redux'
import { logoutStart } from '../../../redux/actions/login/actions'

const { Text } = Typography

const LayoutHeader = () => {
    const dispatch = useDispatch()
    const currentTab = window.location.pathname.split('/')[2]
    const items = [
        {
            key: '1',
            label: 'Profile',
            icon: <UserOutlined />
        },
        {
            key: '2',
            label: 'Logout',
            icon: <LogoutOutlined />
        }
    ]

    const switchHeaderTitle = () => {
        switch (currentTab) {
            case 'songs':
                return 'List of Songs'
            case 'playlists':
                return 'List of Playlists'
            case 'albums':
                return 'List of Albums'
            case 'artists':
                return 'List of Artists'
            case 'genres':
                return 'List of Genres'
            case 'tags':
                return 'List of Tags'
            case 'files':
                return 'List of Files'
            default:
                return 'Management'
        }
    }

    const onClick = ({ key, label }) => {
        if (key === '2') {
            dispatch(logoutStart())
            window.location.href = '/login'
        }
    }

    return (
        <Flex
            justify={'space-between'}
            align={'center'}
            style={{
                padding: '0 15px',
                height: 60,
                borderBottom: '1px solid #f0f0f0',
                backgroundColor: '#fff'
            }}
        >
            <Text
                style={{ fontSize: 20, color: '#169bff', fontWeight: 'bold' }}
            >
                {switchHeaderTitle()}
            </Text>
            <Dropdown
                menu={{ items, onClick }}
                trigger={['click']}
                placement="bottomRight"
                overlayStyle={{ width: 150 }}
            >
                <Avatar
                    shape={'circle'}
                    src={
                        'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png'
                    }
                    style={{ cursor: 'pointer', border: '1px solid #f0f0f0' }}
                    size={'large'}
                />
            </Dropdown>
        </Flex>
    )
}

export default LayoutHeader
