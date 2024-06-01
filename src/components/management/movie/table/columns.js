import { Button, Flex, Image, Input, Space, Tag } from 'antd'
import { DeleteTwoTone, EditTwoTone, SearchOutlined } from '@ant-design/icons'
import React, { useRef, useState } from 'react'
import Highlighter from 'react-highlight-words'
import { getMovieTagColor } from '../utils'
import { useSongsContext } from '../../../../context/useSongsContext'
import defaultImg from '../../../../assets/img/200.png'

export const Columns = (
    tableParams,
    setTableParams,
    setData,
    changeEditModalState
) => {
    const { changeModalMode, changeDeleteModalState } = useSongsContext()
    const [searchText, setSearchText] = useState('')
    const [searchedColumn, setSearchedColumn] = useState('')
    const searchInput = useRef(null)

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm()
        setSearchText(selectedKeys[0])
        setSearchedColumn(dataIndex)
    }

    const handleReset = (clearFilters) => {
        clearFilters()
        setSearchText('')
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({
            setSelectedKeys,
            selectedKeys,
            confirm,
            clearFilters,
            close
        }) => (
            <div
                style={{
                    padding: 8
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                <Input
                    ref={searchInput}
                    placeholder={`Search ${dataIndex}`}
                    value={selectedKeys[0]}
                    onChange={(e) =>
                        setSelectedKeys(e.target.value ? [e.target.value] : [])
                    }
                    onPressEnter={() =>
                        handleSearch(selectedKeys, confirm, dataIndex)
                    }
                    style={{
                        marginBottom: 8,
                        display: 'block'
                    }}
                />
                <Space>
                    <Button
                        type="primary"
                        onClick={() =>
                            handleSearch(selectedKeys, confirm, dataIndex)
                        }
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() =>
                            clearFilters && handleReset(clearFilters)
                        }
                        size="small"
                        style={{
                            width: 90
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            confirm({
                                closeDropdown: false
                            })
                            setSearchText(selectedKeys[0])
                            setSearchedColumn(dataIndex)
                        }}
                    >
                        Filter
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close()
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex]
                .toString()
                .toLowerCase()
                .includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100)
            }
        },
        render: (text) =>
            searchedColumn === dataIndex ? (
                <Highlighter
                    highlightStyle={{
                        backgroundColor: '#ffc069',
                        padding: 0
                    }}
                    searchWords={[searchText]}
                    autoEscape
                    textToHighlight={text ? text.toString() : ''}
                />
            ) : (
                text
            )
    })

    const columns = [
        {
            title: 'Thumbnail',
            dataIndex: 'thumbnail',
            key: 'thumbnail',
            width: '10%',
            render: (thumbnail, record) => (
                <Image
                    src={thumbnail || defaultImg}
                    alt={'thumbnail'}
                    width={80}
                />
            )
        },
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            width: '15%',
            ellipsis: true,
            ...getColumnSearchProps('name')
        },
        {
            title: 'Date',
            dataIndex: 'createDate',
            key: 'createDate',
            width: '15%',
            ellipsis: true,
            ...getColumnSearchProps('createDate'),
            render: (text, record) => (
                <Flex direction="column">
                    <span>{text}</span>
                </Flex>
            )
        },
        {
            title: 'Tags',
            dataIndex: 'tags',
            key: 'tags',
            width: '20%',
            // ...getColumnSearchProps('plot'),
            // sorter: (a, b) => a.plot.length - b.plot.length,
            // sortDirections: ['descend', 'ascend'],
            render: (array, record) => (
                <Space>
                    {array?.map((item) => (
                        <Tag color={getMovieTagColor(item?.tag)} key={item?.id}>
                            {item?.tag}
                        </Tag>
                    ))}
                </Space>
            )
        },
        {
            title: 'Audio',
            dataIndex: 'audio',
            key: 'audio',
            width: '30%',
            ellipsis: true,
            // ...getColumnSearchProps('audio'),
            render: (text, record) => (
                <audio controls>
                    <source src={text?.path} type="audio/mp3" />
                    Your browser does not support the audio element.
                </audio>
            )
        },
        {
            title: 'Actions',
            key: 'actions',
            ellipsis: true,
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
