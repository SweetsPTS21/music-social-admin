import React, { useEffect, useState } from 'react'
import _ from 'lodash'
import { Flex, Table } from 'antd'
import { useTagContext } from '../../../../context/useTagContext'
import { mapper } from './mapper'
import { Columns } from './column'
import { useManagementContext } from '../../../../context/useManagementContext'
import TagToolbar from '../toolbar'

const TagTable = () => {
    const { songTags, tagLoading } = useManagementContext()
    const { fetchTagData, tagUpdating, tagCreating } = useTagContext()
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

    const refetchData = _.debounce(() => {
        setLoading(true)
        const filter = tableParams.filters

        const filterKey = filter ? Object.keys(filter) : []
        const filterValue = filter ? Object.values(filter) : []

        let filterStr = ''
        filterKey?.forEach((key, index) => {
            if (filterValue[index]?.length === 0) return
            if (filterValue[index]) {
                filterStr += `${key} eq ${filterValue[index][0]}`
            }
        })
        if (fetchTagData) {
            fetchTagData({
                page: tableParams.pagination?.current,
                size: tableParams.pagination?.pageSize,
                searchText: filterStr,
                sort: tableParams.sorter
            })
        }
    }, 500)

    useEffect(() => {
        loadData()
    }, [
        tableParams.pagination?.current,
        tableParams.pagination?.pageSize,
        songTags
    ])

    useEffect(() => {
        if (!_.isEmpty(tableParams.filters)) {
            refetchData()
        }
    }, [tableParams.filters])

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
