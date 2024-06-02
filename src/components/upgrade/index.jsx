import React, { useEffect, useRef, useState } from 'react'
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Layout,
    Result,
    Select,
    Row,
    Typography,
    message
} from 'antd'
import Header from '../layout/header'
import HomeFooter from '../layout/footer'
import UploadImages from '../management/components/UploadImages'
import { getUpgradeUserKey, upgradeUser } from '../../api/user/api'
import { getSongGenres } from '../../api/music/api'

const { Content } = Layout
const { Text } = Typography
const { Item } = Form
const { Option } = Select

const ArtistRegister = () => {
    const [loading, setLoading] = useState(false)
    const [activeSuccess, setActiveSuccess] = useState(false)
    const [activeKey, setActiveKey] = useState('')

    const [songGenres, setSongGenres] = useState([])
    const [form] = Form.useForm()

    const ref = useRef(null)

    console.log('activeKey', activeKey)

    useEffect(() => {
        getUpgradeUserKey().then((res) => {
            if (res) {
                setActiveKey(res)
            }
        })
    }, [])

    useEffect(() => {
        getSongGenres().then((res) => {
            if (res) {
                setSongGenres(res)
            }
        })
    }, [])

    const onFinish = (values) => {
        console.log('Received values:', values)
        setLoading(true)

        const newData = new FormData()
        newData.append('nickname', values?.nickname)
        newData.append('genreIds', values?.genres)
        newData.append('country', values?.country)
        newData.append('websiteUrl', values?.website)
        newData.append('image', values?.fileThumbnail)
        newData.append('description', values?.description)

        if (!activeKey) {
            message.error('Something wrong? Try refresh page')
            setLoading(false)
            return
        }

        upgradeUser(activeKey, newData)
            .then((res) => {
                if (res?.id) {
                    setActiveSuccess(true)
                } else {
                    message.error('Error! Please try again')
                }
            })
            .finally(() => {
                setLoading(false)
            })
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
                            Please fill in the information below to complete the
                            registration process
                        </Text>
                    </Col>
                    <Col span={24}>
                        <Form
                            form={form}
                            name="active-form"
                            onFinish={onFinish}
                        >
                            <Row gutter={[16, 16]}>
                                <Col
                                    md={12}
                                    xs={24}
                                    className="flex justify-center"
                                >
                                    <UploadImages form={form} required={true} />
                                </Col>
                                <Col md={12} xs={24}>
                                    <Flex vertical className="flex-1">
                                        <Item
                                            label="Nickname"
                                            name="nickname"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your nickname!'
                                                }
                                            ]}
                                            labelCol={{
                                                md: { span: 7 },
                                                sm: { span: 5 }
                                            }}
                                            wrapperCol={{
                                                md: { span: 17 },
                                                sm: { span: 19 }
                                            }}
                                            labelAlign="left"
                                        >
                                            <Input
                                                ref={ref}
                                                placeholder="Nickname"
                                                type="text"
                                                autoComplete="off"
                                            />
                                        </Item>
                                        <Item
                                            label="Genres"
                                            name="genres"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please select your genres!'
                                                }
                                            ]}
                                            labelCol={{
                                                md: { span: 7 },
                                                sm: { span: 5 }
                                            }}
                                            wrapperCol={{
                                                md: { span: 17 },
                                                sm: { span: 19 }
                                            }}
                                            labelAlign="left"
                                        >
                                            <Select
                                                mode="multiple"
                                                placeholder="Genres"
                                                title={'select'}
                                            >
                                                {songGenres?.map((item) => (
                                                    <Option
                                                        key={item?.id}
                                                        value={item?.id}
                                                    >
                                                        {item?.genre}
                                                    </Option>
                                                ))}
                                            </Select>
                                        </Item>
                                        <Item
                                            label="Country"
                                            name="country"
                                            rules={[
                                                {
                                                    required: true,
                                                    message:
                                                        'Please input your country!'
                                                }
                                            ]}
                                            labelCol={{
                                                md: { span: 7 },
                                                sm: { span: 5 }
                                            }}
                                            wrapperCol={{
                                                md: { span: 17 },
                                                sm: { span: 19 }
                                            }}
                                            labelAlign="left"
                                        >
                                            <Input
                                                placeholder="Country"
                                                type="text"
                                                autoComplete="off"
                                            />
                                        </Item>
                                        <Item
                                            label="Website"
                                            name="website"
                                            labelCol={{
                                                md: { span: 7 },
                                                sm: { span: 5 }
                                            }}
                                            wrapperCol={{
                                                md: { span: 17 },
                                                sm: { span: 19 }
                                            }}
                                            labelAlign="left"
                                        >
                                            <Input
                                                placeholder="Website"
                                                type="text"
                                                autoComplete="off"
                                            />
                                        </Item>
                                    </Flex>
                                </Col>
                            </Row>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className={'w-full'}
                                loading={loading}
                            >
                                Register
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
            <Content
                className={'lg:w-[80%] sm:w-full'}
                style={{
                    overflow: 'auto'
                }}
            >
                <Flex
                    justify={'center'}
                    align={'center'}
                    style={{
                        padding: 16
                    }}
                >
                    <Flex
                        align={'center'}
                        justify={'center'}
                        className={'bg-white'}
                        style={{
                            padding: 24,
                            borderRadius: 8,
                            maxWidth: 800
                        }}
                    >
                        {activeSuccess ? (
                            <Result
                                status="success"
                                title="Successfully Register Artist!"
                                subTitle="You can now close this window and check mail for details."
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

export default ArtistRegister
