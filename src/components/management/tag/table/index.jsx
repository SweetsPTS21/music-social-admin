import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Flex, Table } from 'antd'
import { useTagContext } from '../../../../context/useTagContext'
import { mapper } from './mapper'
import { Columns } from './column'
import { useManagementContext } from '../../../../context/useManagementContext'
import TagToolbar from '../toolbar'

const TagTable = () => {
    const { songTags, tagLoading, fetchSongTags } = useManagementContext()
    const { tagUpdating, tagCreating } = useTagContext()
    const [data, setData] = useState([])
    const [loading, setLoading] = useState(false)
    const [tableParams, setTableParams] = useState({
        filters: {},
        pagination: {
            current: 1,
            pageSize: 10
        }
    })

    const loadData = () => {
        setLoading(true)
        const delayFn = setTimeout(() => {
            setData(mapper(songTags))
            setLoading(false)
        }, 500)

        return () => clearTimeout(delayFn)
    }

    useEffect(() => {
        loadData()
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        songTags
    ])

    const handleTableChange = (pagination, filters, sorter) => {
        setTableParams({
            pagination,
            filters,
            ...sorter
        })
        // `dataSource` is useless since `pageSize` changed
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([])
        }
    }

    return (
        <Flex vertical className={'h-full'}>
            <TagToolbar />
            <Table
                columns={Columns()}
                dataSource={data}
                pagination={tableParams?.pagination}
                loading={tagLoading || loading || tagUpdating || tagCreating}
                onChange={handleTableChange}
                scroll={{
                    y: 'calc(100vh - 390px)'
                }}
                className={'ms-common-table'}
            />
        </Flex>
    )
}

export default TagTable
