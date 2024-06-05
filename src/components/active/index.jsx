import React, { useEffect, useState } from 'react'
import { Button, Flex, Layout, Result } from 'antd'
import Header from '../layout/header'
import HomeFooter from '../layout/footer'
import { useSearchParams } from 'react-router-dom'
import { activeUser } from '../../api/auth/api'

const { Content } = Layout

const ActiveUser = () => {
    const [searchParams] = useSearchParams()
    const activeKey = searchParams.get('activeKey')
    const [loading, setLoading] = useState(false)

    const [activeSuccess, setActiveSuccess] = useState(false)

    useEffect(() => {
        if (activeKey) {
            handleActiveUser()
        }
    }, [activeKey])

    const handleActiveUser = async () => {
        setLoading(true)
        await activeUser(activeKey)
            .then((res) => {
                if (res?.response?.status === 200) {
                    setActiveSuccess(true)
                }
            })
            .catch((err) => {
                console.log('err', err)
            })
            .finally(() => {
                setLoading(false)
            })
    }

    return (
        <Layout
            style={{
                width: '100vw',
                height: '100vh',
                backgroundColor: '#f0f2f5'
            }}
        >
            <Header />
            <Content className={'w-[80%]'} style={{ margin: '0 auto' }}>
                {activeKey ? (
                    <Flex
                        className={'p-4 h-full'}
                        justify={'center'}
                        align={'center'}
                    >
                        <Flex
                            align={'center'}
                            justify={'center'}
                            className={'bg-white'}
                            style={{
                                height: 400,
                                padding: 24,
                                borderRadius: 8
                            }}
                        >
                            {activeSuccess ? (
                                <Result
                                    status="success"
                                    title="Successfully Active Your Account!"
                                    subTitle="You can now close this window and login to your account in app."
                                    extra={[
                                        <Button
                                            key="home"
                                            onClick={() =>
                                                (window.location.href = '/')
                                            }
                                        >
                                            Home
                                        </Button>
                                    ]}
                                />
                            ) : (
                                <Result
                                    status="error"
                                    title="Failed to Active Your Account"
                                    subTitle="Please check your active key and try again."
                                    extra={[
                                        <Button
                                            key="home"
                                            onClick={() =>
                                                (window.location.href = '/')
                                            }
                                        >
                                            Home
                                        </Button>
                                    ]}
                                />
                            )}
                        </Flex>
                    </Flex>
                ) : (
                    <Result
                        status="404"
                        title="Sorry"
                        subTitle="The page you visited does not exist."
                        extra={
                            <Button
                                type="primary"
                                onClick={() => (window.location.href = '/')}
                            >
                                Back Home
                            </Button>
                        }
                    />
                )}
            </Content>
            <HomeFooter />
        </Layout>
    )
}

export default ActiveUser
