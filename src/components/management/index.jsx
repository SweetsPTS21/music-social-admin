import React, { useState } from 'react'
import {
    BarsOutlined,
    DesktopOutlined,
    FileOutlined,
    FireOutlined,
    PictureOutlined,
    PieChartOutlined,
    PlaySquareOutlined,
    StarOutlined,
    TeamOutlined
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import { Link, Outlet, useNavigate } from 'react-router-dom'
import SideHeader from './components/SideHeader'
import LayoutHeader from './components/LayoutHeader'
const { Content, Footer, Sider } = Layout
const { Item } = Breadcrumb

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
    getItem('Songs', '2', <FireOutlined />),
    getItem('Playlists', '3', <PlaySquareOutlined />),
    getItem('Albums', '4', <PictureOutlined />),
    getItem('Artist', '5', <TeamOutlined />),
    getItem('Genres', '6', <BarsOutlined />),
    getItem('Tags', '7', <StarOutlined />),
    getItem('Files', '8', <FileOutlined />)
]

const siderItems = [
    {
        key: '1',
        icon: <DesktopOutlined />,
        label: 'Home',
        url: '/management'
    },
    {
        key: '2',
        icon: <FireOutlined />,
        label: 'Songs',
        url: '/management/songs'
    },
    {
        key: '3',
        icon: <PlaySquareOutlined />,
        label: 'Playlists',
        url: '/management/playlists'
    },
    {
        key: '4',
        icon: <PictureOutlined />,
        label: 'Albums',
        url: '/management/albums'
    },
    {
        key: '5',
        icon: <TeamOutlined />,
        label: 'Artist',
        url: '/management/artists'
    },
    {
        key: '6',
        icon: <BarsOutlined />,
        label: 'Genres',
        url: '/management/genres'
    },
    {
        key: '7',
        icon: <StarOutlined />,
        label: 'Tags',
        url: '/management/tags'
    },
    {
        key: '8',
        icon: <FileOutlined />,
        label: 'Files',
        url: '/management/files'
    }
]

const AdminHome = () => {
    const navigate = useNavigate()
    const [collapsed, setCollapsed] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState(['1'])
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()

    function onSelect({ item, key, keyPath, selectedKeys, domEvent }) {
        navigate(siderItems.find((item) => item.key === key)?.url)
        setSelectedKeys([key])
    }

    const currentTab = window.location.pathname.toString()

    return (
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
                    <Breadcrumb
                        style={{
                            margin: '16px 0'
                        }}
                    >
                        {siderItems?.map((item) => (
                            <Item>
                                <Link to={item?.url}>
                                    {item?.url === currentTab ? (
                                        <div
                                            style={{
                                                color: '#169bff',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {item?.label}
                                        </div>
                                    ) : (
                                        item?.label
                                    )}
                                </Link>
                            </Item>
                        ))}
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            height: 'calc(100vh - 182px)',
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG,
                            overflow: 'auto'
                        }}
                    >
                        <Outlet />
                    </div>
                </Content>
                <Footer
                    style={{
                        textAlign: 'center'
                    }}
                >
                    Music Social ©{new Date().getFullYear()} Created by SWPTS
                </Footer>
            </Layout>
        </Layout>
    )
}

export default AdminHome
