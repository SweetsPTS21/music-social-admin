import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Layout,
    Result,
    Row,
    Typography
} from 'antd'
import Header from '../layout/header'
import HomeFooter from '../layout/footer'
import { useSearchParams } from 'react-router-dom'
import { activeUser } from '../../api/auth/api'

const { Content } = Layout
const { Item } = Form
const { Text } = Typography

const ActiveUser = () => {
    const [searchParams] = useSearchParams()
    const activeKey = searchParams.get('activeKey')
    const [form] = Form.useForm()
    const [loading, setLoading] = useState(false)

    const [activeSuccess, setActiveSuccess] = useState(false)

    const ref = useRef()

    useEffect(() => {
        if (activeKey) {
            form.setFieldsValue({ activeKey })
            if (ref.current) {
                ref.current.focus()
            }
        }
    }, [activeKey])

    const onFinish = async (values) => {
        if (values.activeKey) {
            setLoading(true)
            await activeUser(values.activeKey)
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
    }

    const FormActiveUser = () => {
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
                        <Form
                            form={form}
                            name="active-form"
                            initialValues={{ activeKey }}
                            onFinish={onFinish}
                        >
                            <Item
                                label="Active Key"
                                name="activeKey"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your active key!'
                                    }
                                ]}
                            >
                                <Input
                                    ref={ref}
                                    placeholder="Active Key"
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
                                Active
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
                                extra={[<Button key="buy">Home</Button>]}
                            />
                        ) : (
                            <FormActiveUser />
                        )}
                    </Flex>
                </Flex>
            </Content>
            <HomeFooter />
        </Layout>
    )
}

export default ActiveUser
