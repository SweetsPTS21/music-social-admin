import React, { useState } from 'react'
import {
    BarsOutlined,
    DesktopOutlined,
    FireOutlined,
    PictureOutlined,
    PieChartOutlined,
    PlaySquareOutlined,
    StarOutlined,
    TeamOutlined
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, Spin, theme } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import SideHeader from './components/SideHeader'
import LayoutHeader from './components/LayoutHeader'
import { useManagementContext } from '../../context/useManagementContext'
import { useAuthedContext } from '../../context/useAuthedContext'
const { Content, Footer, Sider } = Layout

function getItem(label, key, icon, children) {
    return {
        key,
        icon,
        children,
        label
    }
}

const items = [
    getItem('Home', '1', <PieChartOutlined />),
    getItem('Users', '2', <FireOutlined />),
    getItem('Songs', '3', <FireOutlined />),
    getItem('Playlists', '4', <PlaySquareOutlined />),
    getItem('Albums', '5', <PictureOutlined />),
    getItem('Artist', '6', <TeamOutlined />),
    getItem('Genres', '7', <BarsOutlined />),
    getItem('Tags', '8', <StarOutlined />)
]

const siderItems = [
    {
        key: '1',
        icon: <DesktopOutlined />,
        label: 'Home',
        url: '/management/home'
    },
    {
        key: '2',
        icon: <DesktopOutlined />,
        label: 'Users',
        url: '/management/users'
    },
    {
        key: '3',
        icon: <FireOutlined />,
        label: 'Songs',
        url: '/management/songs'
    },
    {
        key: '4',
        icon: <PlaySquareOutlined />,
        label: 'Playlists',
        url: '/management/playlists'
    },
    {
        key: '5',
        icon: <PictureOutlined />,
        label: 'Albums',
        url: '/management/albums'
    },
    {
        key: '6',
        icon: <TeamOutlined />,
        label: 'Artist',
        url: '/management/artists'
    },
    {
        key: '7',
        icon: <BarsOutlined />,
        label: 'Genres',
        url: '/management/genres'
    },
    {
        key: '8',
        icon: <StarOutlined />,
        label: 'Tags',
        url: '/management/tags'
    }
]

const AdminHome = () => {
    const navigate = useNavigate()
    const { authedUser } = useAuthedContext()
    const [collapsed, setCollapsed] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState(['1'])
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()

    const { songLoading } = useManagementContext()

    function onSelect({ item, key, keyPath, selectedKeys, domEvent }) {
        navigate(siderItems.find((item) => item.key === key)?.url)
        setSelectedKeys([key])
    }

    // const currentTab = window.location.pathname.toString()

    return (
        authedUser && (
            <Layout
                style={{
                    minHeight: '100vh'
                }}
            >
                <Sider
                    theme="light"
                    collapsible
                    collapsed={collapsed}
                    onCollapse={(value) => setCollapsed(value)}
                    width={250}
                    className="shadow-lg"
                >
                    <SideHeader collapsed={collapsed} />
                    <Menu
                        theme="light"
                        defaultSelectedKeys={['1']}
                        mode="inline"
                        items={items}
                        onSelect={onSelect}
                    />
                </Sider>
                <Layout>
                    <LayoutHeader />
                    <Content
                        style={{
                            margin: '0 16px'
                        }}
                    >
                        <div className={'mb-4'} />
                        <div
                            style={{
                                padding: 24,
                                minHeight: 360,
                                height: 'calc(100vh - 183px)',
                                background: colorBgContainer,
                                borderRadius: borderRadiusLG,
                                overflow: 'auto'
                            }}
                        >
                            {songLoading ? (
                                <Spin
                                    spinning={songLoading}
                                    fullscreen
                                    tip="Please wait..."
                                />
                            ) : (
                                <Outlet />
                            )}
                        </div>
                    </Content>
                    <Footer
                        style={{
                            textAlign: 'center'
                        }}
                    >
                        Music Social ©{new Date().getFullYear()}
                    </Footer>
                </Layout>
            </Layout>
        )
    )
}

export default AdminHome
