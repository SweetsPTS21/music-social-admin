import React from 'react'
import Header from '../layout/header'
import HomeFooter from '../layout/footer'
import { Layout } from 'antd'

const { Content } = Layout

const ResetPassword = () => {
    return (
        <Layout
            className={'w-screen h-screen'}
            style={{ backgroundColor: '#f0f2f5' }}
        >
            <Header />
            <Content className={'w-[80%]'} style={{ margin: '0 auto' }}>
                <div className={'bg-white p-4'}>
                    <h1>Active User</h1>
                </div>
            </Content>
            <HomeFooter />
        </Layout>
    )
}

export default ResetPassword
