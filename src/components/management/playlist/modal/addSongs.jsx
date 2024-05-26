import React, { useEffect, useState } from 'react'
import { useManagementContext } from '../../../../context/useManagementContext'
import { usePlaylistContext } from '../../../../context/usePlaylistContext'
import {
    addSongToPlaylist,
    removeSongFromPlaylist
} from '../../../../api/playlist/api'
import {
    Avatar,
    Button,
    Col,
    Divider,
    Flex,
    Input,
    List,
    Row,
    Skeleton,
    Spin,
    Tooltip,
    Typography
} from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { Link } from 'react-router-dom'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

const { Item } = List
const { Search } = Input
const { Text } = Typography

const AddSongs = () => {
    const { allSongs } = useManagementContext()
    const {
        editModalState: currentPlaylist,
        playlistLoading,
        playlistSongs,
        fetchPlaylistSongs
    } = usePlaylistContext()

    const { allPlaylistLoading } = useManagementContext()

    const [playlistSongsData, setPlaylistSongsData] = useState([])
    const [unselectedSongsData, setUnselectedSongsData] = useState([])

    const [searchPlaylistSongs, setSearchPlaylistSongs] = useState('')
    const [searchUnselectedSongs, setSearchUnselectedSongs] = useState('')
    const [updateLoading, setUpdateLoading] = useState(false)

    useEffect(() => {
        if (currentPlaylist?.id) {
            setPlaylistSongsData([])
            fetchPlaylistSongs(currentPlaylist?.id)
        }
    }, [currentPlaylist?.id])

    useEffect(() => {
        if (playlistSongs?.length > 0) {
            setPlaylistSongsData(playlistSongs)
        }
    }, [playlistSongs])

    useEffect(() => {
        if (allSongs?.length > 0) {
            setUnselectedSongsData(allSongs)
        }
    }, [allSongs])

    useEffect(() => {
        const filter = playlistSongs?.filter((song) => {
            return song?.name
                ?.toLowerCase()
                .includes(searchPlaylistSongs.toLowerCase())
        })
        setPlaylistSongsData(filter)
    }, [searchPlaylistSongs])

    useEffect(() => {
        const filter = allSongs?.filter((song) => {
            return song?.name
                ?.toLowerCase()
                .includes(searchUnselectedSongs.toLowerCase())
        })
        setUnselectedSongsData(filter)
    }, [searchUnselectedSongs])

    const loadMoreData = () => {
        console.log('load more data')
    }

    const addToPlaylist = (song) => {
        setUpdateLoading(true)
        addSongToPlaylist(currentPlaylist?.id, song?.id)
            .then((res) => {
                fetchPlaylistSongs(currentPlaylist?.id)
                setPlaylistSongsData([song, ...playlistSongsData])
            })
            .finally(() => {
                setUpdateLoading(false)
            })
    }

    const removeFromPlaylist = (song) => {
        setUpdateLoading(true)
        removeSongFromPlaylist(currentPlaylist?.id, song?.id)
            .then((res) => {
                fetchPlaylistSongs(currentPlaylist?.id)
                setPlaylistSongsData(
                    playlistSongsData?.filter(
                        (playlistSong) => playlistSong?.id !== song?.id
                    )
                )
            })
            .finally(() => {
                setUpdateLoading(false)
            })
    }

    const isInPlaylist = (song) => {
        return playlistSongsData?.find(
            (playlistSong) => playlistSong?.id === song?.id
        )
    }

    const renderAllSongs = () => {
        return (
            <Flex vertical>
                <Search
                    placeholder="Search songs"
                    enterButton
                    size="middle"
                    onSearch={(value) => setSearchUnselectedSongs(value)}
                />
                <div
                    id="scrollableDiv"
                    style={{
                        height: 400,
                        overflow: 'auto',
                        padding: '0 16px'
                    }}
                >
                    <InfiniteScroll
                        dataLength={unselectedSongsData?.length}
                        next={loadMoreData}
                        hasMore={allSongs?.length > 10}
                        loader={
                            <Skeleton
                                avatar
                                paragraph={{
                                    rows: 1
                                }}
                                active
                            />
                        }
                        endMessage={
                            <Divider plain>
                                {'Not in here. '}
                                <Link to={`/management/songs`}>Add now 🤐</Link>
                            </Divider>
                        }
                        scrollableTarget="scrollableDiv"
                    >
                        <List
                            dataSource={unselectedSongsData}
                            renderItem={(item) => (
                                <Item key={item?.id}>
                                    <Item.Meta
                                        avatar={
                                            <Avatar
                                                src={item?.thumbnail?.path}
                                            />
                                        }
                                        title={
                                            <a href={`/songs/${item?.id}`}>
                                                {item?.name}
                                            </a>
                                        }
                                        description={item?.caption}
                                    />
                                    <Tooltip
                                        title={
                                            isInPlaylist(item)
                                                ? 'Already added'
                                                : 'Add this song to playlist'
                                        }
                                    >
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => addToPlaylist(item)}
                                            disabled={isInPlaylist(item)}
                                        />
                                    </Tooltip>
                                </Item>
                            )}
                        />
                    </InfiniteScroll>
                </div>
            </Flex>
        )
    }

    const renderPlaylistSongs = () => {
        return (
            <Flex vertical>
                <Search
                    placeholder="Search songs"
                    enterButton
                    size="middle"
                    onSearch={(value) => setSearchPlaylistSongs(value)}
                />
                <List
                    dataSource={playlistSongsData}
                    renderItem={(item) => (
                        <Item key={item?.id}>
                            <Item.Meta
                                avatar={<Avatar src={item?.thumbnail?.path} />}
                                title={
                                    <a href={`/songs/${item?.id}`}>
                                        {item?.name}
                                    </a>
                                }
                                description={item?.caption}
                            />
                            <Tooltip title={'Remove song from playlist'}>
                                <Button
                                    type="primary"
                                    danger
                                    icon={<MinusOutlined />}
                                    onClick={() => removeFromPlaylist(item)}
                                />
                            </Tooltip>
                        </Item>
                    )}
                />
            </Flex>
        )
    }

    return (
        <Spin spinning={updateLoading || playlistLoading || allPlaylistLoading}>
            <Row gutter={[16, 16]}>
                <Col span={11}>
                    <Flex vertical gap={8}>
                        <Text strong>Playlist songs</Text>
                        {renderPlaylistSongs()}
                    </Flex>
                </Col>
                <Col span={1}>
                    <Divider
                        type="vertical"
                        orientation={'center'}
                        className={'h-[33em]'}
                    />
                </Col>
                <Col span={12}>
                    <Flex vertical gap={8}>
                        <Text strong>All songs</Text>
                        {renderAllSongs()}
                    </Flex>
                </Col>
            </Row>
        </Spin>
    )
}

export default AddSongs
