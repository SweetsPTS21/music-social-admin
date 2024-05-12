import React, { useEffect } from 'react'
import { ConfigProvider, Layout } from 'antd'
import Header from '../layout/header'
import rootBG from '../../assets/img/rootBG.jpg'
import HomeFooter from '../layout/footer'
import LoginContent from './content'
import { useAuthedContext } from '../../context/useAuthedContext'

const LoginPage = () => {
    const { authedUser } = useAuthedContext()

    useEffect(() => {
        if (authedUser) {
            window.location.href = '/management'
        }
    }, [authedUser])

    return (
        !authedUser && (
            <Layout
                style={{
                    width: '100%',
                    height: '100vh',
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center'
                }}
            >
                <Header />
                <LoginContent />
                <div
                    className={'relative flex justify-center pt-12 pb-12'}
                    style={{
                        backgroundColor: 'rgba(0, 0, 0, 0.9)'
                    }}
                >
                    <HomeFooter bgColor={'transparent'} zIndex={10} />
                </div>
            </Layout>
        )
    )
}

export default LoginPage
