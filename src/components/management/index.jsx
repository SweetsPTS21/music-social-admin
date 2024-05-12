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
    TeamOutlined,
    UserOutlined
} from '@ant-design/icons'
import { Breadcrumb, Layout, Menu, theme } from 'antd'
import MovieManagement from './movie'
import Home from './home'
import PlaylistManagement from './playlist'
import AlbumManagement from './album'
import ArtistManagement from './artist'
import GenreManagement from './genre'
import TagManagement from './tag'
const { Header, Content, Footer, Sider } = Layout

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
    getItem('Songs', 'sub1', <FireOutlined />, [
        getItem('Management', '2'),
        getItem('Statistic', '3')
    ]),
    getItem('Playlists', 'sub2', <PlaySquareOutlined />, [
        getItem('Management', '4'),
        getItem('Statistic', '5')
    ]),
    getItem('Albums', 'sub3', <PictureOutlined />, [
        getItem('Management', '6'),
        getItem('Team 2', '7')
    ]),
    getItem('Artist', '8', <TeamOutlined />),
    getItem('Genres', '10', <BarsOutlined />),
    getItem('Tags', '11', <StarOutlined />),
    getItem('Files', '12', <FileOutlined />)
]

const renderContent = (key) => {
    switch (key) {
        case '1':
            return <Home />
        case '2':
            return <MovieManagement />
        case '3':
            return <div>Tom</div>
        case '4':
            return <PlaylistManagement />
        case '5':
            return <div>Alex</div>
        case '6':
            return <AlbumManagement />
        case '7':
            return <div>Team 2</div>
        case '8':
            return <ArtistManagement />
        case '10':
            return <GenreManagement />
        case '11':
            return <TagManagement />
        default:
            return <div>Option 1</div>
    }
}

const AdminHome = () => {
    const [collapsed, setCollapsed] = useState(false)
    const [selectedKeys, setSelectedKeys] = useState(['1'])
    const {
        token: { colorBgContainer, borderRadiusLG }
    } = theme.useToken()

    function onSelect({ item, key, keyPath, selectedKeys, domEvent }) {
        console.log({ item, key, keyPath, selectedKeys, domEvent })
        setSelectedKeys([key])
    }

    return (
        <Layout
            style={{
                minHeight: '100vh'
            }}
        >
            <Sider
                collapsible
                collapsed={collapsed}
                onCollapse={(value) => setCollapsed(value)}
            >
                <div className="demo-logo-vertical" />
                <Menu
                    theme="light"
                    defaultSelectedKeys={['1']}
                    mode="inline"
                    items={items}
                    onSelect={onSelect}
                />
            </Sider>
            <Layout>
                <Header
                    style={{
                        padding: 0,
                        background: colorBgContainer
                    }}
                />
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
                        <Breadcrumb.Item>User</Breadcrumb.Item>
                        <Breadcrumb.Item>Bill</Breadcrumb.Item>
                    </Breadcrumb>
                    <div
                        style={{
                            padding: 24,
                            minHeight: 360,
                            background: colorBgContainer,
                            borderRadius: borderRadiusLG
                        }}
                    >
                        {renderContent(selectedKeys[0])}
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
