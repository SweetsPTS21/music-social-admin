import React from 'react'

import { Route, Routes } from 'react-router-dom'
import AdminHome from '../../components/management'

const ManagementRouter = () => {
    return (
        <Routes>
            <Route path="/" element={<AdminHome />} />
        </Routes>
    )
}

export default ManagementRouter
