import React, { useEffect } from 'react'
import { Layout } from 'antd'
import Header from '../layout/header'
import HomeFooter from '../layout/footer'
import LoginContent from './content'
import { useAuthedContext } from '../../context/useAuthedContext'

const LoginPage = () => {
    const { authedUser } = useAuthedContext()

    useEffect(() => {
        if (authedUser) {
            window.location.href = '/management/home'
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
                    className={
                        'relative flex justify-center pt-12 pb-12 w-full'
                    }
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
