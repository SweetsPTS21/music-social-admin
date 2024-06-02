import React, { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip } from 'recharts'
import { useManagementContext } from '../../../context/useManagementContext'
import { random } from 'lodash'
import { Flex } from 'antd'

const renderCustomAxisTicks = ({ x, y, payload }) => {
    return (
        <text x={x - 5} y={y + 4} dy={16} textAnchor="middle" fill="#666">
            {payload.value}
        </text>
    )
}

function CustomTooltip({ payload, label, active }) {
    if (active && payload) {
        const current = payload[0] || {}
        return (
            <Flex className="bg-white opacity-80 rounded-lg p-3" gap={8}>
                <img
                    src={current.payload?.image}
                    alt="song"
                    width="50"
                    height="50"
                />
                <Flex vertical>
                    <p className="label">{`Tên bài hát: ${label}`}</p>
                    <p className="intro">{`Lượt thích: ${current.payload?.likes}`}</p>
                    <p className="intro">{`Lượt nghe: ${current.value}`}</p>
                    <p className="intro">{`Người tạo: ${current.payload?.creator}`}</p>
                    <p className="desc"></p>
                </Flex>
            </Flex>
        )
    }

    return null
}

const renderCustomBarLabel = ({ payload, x, y, width, height, value }) => {
    return (
        <text
            x={x + width / 2}
            y={y}
            fill="#666"
            textAnchor="middle"
            dy={-6}
        >{`${value}`}</text>
    )
}

const HomeCharts = () => {
    const { allSongs } = useManagementContext()
    const [data, setData] = useState([])
    const statistics = JSON.parse(localStorage.getItem('statistics'))

    useEffect(() => {
        if (allSongs?.length > 0) {
            if (!statistics) {
                const newData = allSongs
                    ?.slice(0, 7)
                    ?.map((song) => {
                        return {
                            name: song?.name,
                            uv: song?.listens || random(10, 100),
                            pv: 2000,
                            amt: 2000,
                            image: song?.thumbnail?.path,
                            likes: song?.likes,
                            creator: song?.creator || 'Admin'
                        }
                    })
                    ?.sort((a, b) => b.uv - a.uv)
                setData(newData)
                localStorage.setItem('statistics', JSON.stringify(newData))
            }
            setData(statistics)
        }
    }, [allSongs, statistics?.length])

    return (
        <BarChart width={600} height={300} data={data}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip content={<CustomTooltip />} />
            <Bar
                dataKey="uv"
                fill="#8884d8"
                barSize={30}
                label={renderCustomBarLabel}
            />
        </BarChart>
    )
}

export default HomeCharts
