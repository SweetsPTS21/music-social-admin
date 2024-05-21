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
    Skeleton
} from 'antd'
import InfiniteScroll from 'react-infinite-scroll-component'
import { MinusOutlined, PlusOutlined } from '@ant-design/icons'

const { Item } = List
const { Search } = Input

const AddSongs = () => {
    const { allSongs } = useManagementContext()
    const { editModalState: currentAlbum, fetchAlbumData } = useAlbumContext()

    const albumSongs = useMemo(() => {
        return currentAlbum?.songs || []
    }, [currentAlbum])

    const unselectedSongs = useMemo(() => {
        return allSongs?.filter((song) => {
            return !albumSongs?.find((albumSong) => albumSong?.id === song?.id)
        })
    }, [allSongs, albumSongs])

    const [albumSongsData, setAlbumSongsData] = useState([])
    const [unselectedSongsData, setUnselectedSongsData] = useState([])

    const [page, setPage] = useState(1)
    const [size, setSize] = useState(3)

    const [searchAlbumSongs, setSearchAlbumSongs] = useState('')
    const [searchUnselectedSongs, setSearchUnselectedSongs] = useState('')

    useEffect(() => {
        if (currentAlbum?.length > 0) {
            setAlbumSongsData(albumSongs)
        }
    }, [currentAlbum])

    useEffect(() => {
        if (unselectedSongs?.length > 0) {
            setUnselectedSongsData(unselectedSongs)
        }
    }, [unselectedSongs])

    useEffect(() => {
        const filter = albumSongs?.filter((song) => {
            return song?.name
                ?.toLowerCase()
                .includes(searchAlbumSongs.toLowerCase())
        })
        setAlbumSongsData(filter)
    }, [searchAlbumSongs])

    useEffect(() => {
        const filter = unselectedSongs?.filter((song) => {
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
        setAlbumSongsData([song, ...albumSongsData])

        const filteredSongs = unselectedSongsData?.filter(
            (unselectedSong) => unselectedSong?.id !== song?.id
        )
        setUnselectedSongsData(filteredSongs)
    }

    const removeFromAlbum = (song) => {
        const filteredSongs = albumSongsData?.filter(
            (albumSong) => albumSong?.id !== song?.id
        )
        setAlbumSongsData(filteredSongs)

        setUnselectedSongsData([song, ...unselectedSongsData])
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
                        hasMore={unselectedSongsData?.length < size}
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
                            <Divider plain>It is all, nothing more 🤐</Divider>
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
                                    <Button
                                        type="primary"
                                        icon={<PlusOutlined />}
                                        onClick={() => addToAlbum(item)}
                                        disabled={isInAlbum(item)}
                                    />
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
                            <Button
                                type="primary"
                                danger
                                icon={<MinusOutlined />}
                                onClick={() => removeFromAlbum(item)}
                            />
                        </Item>
                    )}
                />
            </Flex>
        )
    }

    return (
        <Row gutter={[16, 16]}>
            <Col span={12}>{renderAlbumSongs()}</Col>
            <Col span={12}>{renderAllSongs()}</Col>
        </Row>
    )
}

export default AddSongs
