import React, { useEffect, useRef, useState } from 'react'
import Header from '../layout/header'
import HomeFooter from '../layout/footer'
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Layout,
    Result,
    Row,
    Spin,
    Typography
} from 'antd'
import { forgotPassword, resetPassword } from '../../api/auth/api'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { FrownTwoTone, MehOutlined, SmileOutlined } from '@ant-design/icons'

const { Content } = Layout
const { Item } = Form
const { Text } = Typography

const ResetPassword = () => {
    const [form] = Form.useForm()
    const ref = useRef()
    const navigate = useNavigate()

    const [loading, setLoading] = useState(false)
    const [resetSuccess, setResetSuccess] = useState(false)
    const [resetDone, setResetDone] = useState(false)
    const [resetError, setResetError] = useState(false)

    const [searchParams] = useSearchParams()
    const resetKey = searchParams.get('resetKey')
    const [resetLoading, setResetLoading] = useState(false)

    useEffect(() => {
        if (resetKey) {
            handleResetPassword(resetKey).then((r) => r)
        }
    }, [resetKey])

    const handleResetPassword = async (resetKey) => {
        setResetLoading(true)
        await resetPassword(resetKey)
            .then((res) => {
                if (res?.response?.status === 200) {
                    setResetDone(true)
                } else {
                    setResetError(true)
                }
            })
            .catch((err) => {
                console.log('err', err)
                setResetError(true)
            })
            .finally(() => {
                setResetLoading(false)
            })
    }

    const onFinish = async (values) => {
        if (values.email) {
            setLoading(true)
            await forgotPassword(values.email)
                .then((res) => {
                    if (res?.response?.status === 200) {
                        setResetSuccess(true)
                    }
                })
                .catch((err) => {
                    console.log('err', err)
                })
                .finally(() => {
                    setLoading(false)
                })
        }
    }

    const handleBack = () => {
        navigate('/reset')
    }

    const FormResetPassword = () => {
        return (
            <div
                className={'text-center'}
                style={{
                    border: '1px solid #e4e4e4',
                    padding: '20px',
                    borderRadius: '8px'
                }}
            >
                <Row gutter={[16, 16]}>
                    <Col span={24}>
                        <Text style={{ color: '#6d6e6f' }}>
                            Enter your active key sent to you via email
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Form form={form} name="reset-form" onFinish={onFinish}>
                            <Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!'
                                    }
                                ]}
                            >
                                <Input
                                    ref={ref}
                                    placeholder="Email"
                                    type="text"
                                    autoComplete="off"
                                />
                            </Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={'w-full'}
                                loading={loading}
                            >
                                Reset
                            </Button>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
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
                <Flex
                    className={'bg-white p-4 h-full'}
                    justify={'center'}
                    align={'center'}
                >
                    {!resetKey &&
                        !resetSuccess &&
                        !resetDone &&
                        !resetError && <FormResetPassword />}

                    {!resetDone ? (
                        resetSuccess && (
                            <Result
                                status="success"
                                title="Successfully Reset Your Password!"
                                subTitle="We have sent you an email with a link to reset your password. Please check your email."
                                extra={[
                                    <Button key="home" onClick={handleBack}>
                                        Back
                                    </Button>
                                ]}
                            />
                        )
                    ) : (
                        <Spin spinning={resetLoading}>
                            <Result
                                icon={<SmileOutlined />}
                                title="Great, you have successfully reset your password!"
                                subTitle="New password has been sent to your email."
                                extra={
                                    <Button type="primary" onClick={handleBack}>
                                        Back
                                    </Button>
                                }
                            />
                        </Spin>
                    )}

                    {resetError && (
                        <Result
                            icon={<FrownTwoTone twoToneColor={'#ff4d4f'} />}
                            title={
                                <Text style={{ fontSize: '1.3em' }}>
                                    Failed to reset password!
                                </Text>
                            }
                            subTitle="Please try again."
                            extra={[
                                <Button key="home" type="primary">
                                    Home
                                </Button>
                            ]}
                        />
                    )}
                </Flex>
            </Content>
            <HomeFooter />
        </Layout>
    )
}

export default ResetPassword
