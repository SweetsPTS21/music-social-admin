import React from 'react'
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    Layout,
    Row,
    Select,
    Typography
} from 'antd'
import UploadImages from '../../components/UploadImages'

const { Content } = Layout
const { Text } = Typography
const { Item } = Form
const { Option } = Select

const AdminUpgradeArtist = () => {
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
                    <Form form={form} name="active-form" onFinish={onFinish}>
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

export default AdminUpgradeArtist
