import React from 'react'
import { useManagementContext } from '../../../context/useManagementContext'
import { Spin } from 'antd'

const Home = () => {
    const { songLoading } = useManagementContext()
    return (
        <div>
            <Spin spinning={songLoading} fullscreen tip="Please wait..." />
        </div>
    )
}

export default Home
