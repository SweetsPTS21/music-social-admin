import React, { useEffect, useMemo, useState } from 'react'
import { useManagementContext } from '../../../../context/useManagementContext'
import { useAlbumContext } from '../../../../context/useAlbumContext'
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
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'
import { Link } from 'react-router-dom'
import { addSongToAlbum, removeSongFromAlbum } from '../../../../api/album/api'

const { Item } = List
const { Search } = Input
const { Text } = Typography

const AddSongs = () => {
    const { allSongs } = useManagementContext()
    const { editModalState: currentAlbum, albumLoading } = useAlbumContext()

    const { fetchAlbumData, allAlbumsLoading } = useManagementContext()

    const [albumSongsData, setAlbumSongsData] = useState([])
    const [unselectedSongsData, setUnselectedSongsData] = useState([])

    const [searchAlbumSongs, setSearchAlbumSongs] = useState('')
    const [searchUnselectedSongs, setSearchUnselectedSongs] = useState('')
    const [updateLoading, setUpdateLoading] = useState(false)

    console.log('currentAlbum', currentAlbum)

    useEffect(() => {
        if (currentAlbum?.songs?.length > 0) {
            setAlbumSongsData(currentAlbum?.songs)
        }
    }, [currentAlbum])

    useEffect(() => {
        if (allSongs?.length > 0) {
            setUnselectedSongsData(allSongs)
        }
    }, [allSongs])

    useEffect(() => {
        const filter = currentAlbum?.songs?.filter((song) => {
            return song?.name
                ?.toLowerCase()
                .includes(searchAlbumSongs.toLowerCase())
        })
        setAlbumSongsData(filter)
    }, [searchAlbumSongs])

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

    const addToAlbum = (song) => {
        setUpdateLoading(true)
        addSongToAlbum(currentAlbum?.id, song?.id)
            .then((res) => {
                if (res?.id) {
                    fetchAlbumData()
                    setAlbumSongsData([song, ...albumSongsData])
                }
            })
            .finally(() => {
                setUpdateLoading(false)
            })
    }

    const removeFromAlbum = (song) => {
        setUpdateLoading(true)
        removeSongFromAlbum(currentAlbum?.id, song?.id)
            .then((res) => {
                if (res?.id) {
                    fetchAlbumData()
                    setAlbumSongsData(
                        albumSongsData?.filter(
                            (albumSong) => albumSong?.id !== song?.id
                        )
                    )
                }
            })
            .finally(() => {
                setUpdateLoading(false)
            })
    }

    const isInAlbum = (song) => {
        return albumSongsData?.find((albumSong) => albumSong?.id === song?.id)
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
                                            isInAlbum(item)
                                                ? 'Already added'
                                                : 'Add this song to album'
                                        }
                                    >
                                        <Button
                                            type="primary"
                                            icon={<PlusOutlined />}
                                            onClick={() => addToAlbum(item)}
                                            disabled={isInAlbum(item)}
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

    const renderAlbumSongs = () => {
        return (
            <Flex vertical>
                <Search
                    placeholder="Search songs"
                    enterButton
                    size="middle"
                    onSearch={(value) => setSearchAlbumSongs(value)}
                />
                <List
                    dataSource={albumSongsData}
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
                            <Tooltip title={'Remove song from album'}>
                                <Button
                                    type="primary"
                                    danger
                                    icon={<MinusOutlined />}
                                    onClick={() => removeFromAlbum(item)}
                                />
                            </Tooltip>
                        </Item>
                    )}
                />
            </Flex>
        )
    }

    return (
        <Spin spinning={updateLoading || albumLoading || allAlbumsLoading}>
            <Row gutter={[16, 16]}>
                <Col span={11}>
                    <Flex vertical gap={8}>
                        <Text strong>Album songs</Text>
                        {renderAlbumSongs()}
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
