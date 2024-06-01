import React, { useEffect, useState } from 'react'
import { Table } from 'antd'
import { mapper } from './mapper'
import { Columns } from './columns'
import _ from 'lodash'
import { useSongsContext } from '../../../../context/useSongsContext'
import { useManagementContext } from '../../../../context/useManagementContext'

const SongsTable = () => {
    const { allSongs, songLoading, fetchSongsData } = useManagementContext()
    const { changeEditModalState } = useSongsContext()
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
            setData(mapper(allSongs))
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
        if (fetchSongsData) {
            fetchSongsData({
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
        allSongs
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
        <Table
            columns={Columns(
                tableParams,
                setTableParams,
                setData,
                changeEditModalState
            )}
            dataSource={data}
            pagination={tableParams?.pagination}
            loading={songLoading || loading}
            onChange={handleTableChange}
            scroll={{
                y: 'calc(100vh - 390px)'
            }}
            className={'ms-common-table'}
        />
    )
}

export default SongsTable
