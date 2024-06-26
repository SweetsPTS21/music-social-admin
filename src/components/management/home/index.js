import React from 'react'
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
    CustomerServiceOutlined,
    LikeOutlined,
    SmileOutlined
} from '@ant-design/icons'
import { Alert, Card, Col, Flex, Row, Progress, Statistic } from 'antd'
import CountUp from 'react-countup'
import HomeCharts, { renderHomeCharts } from './charts'

const formatter = (value) => <CountUp end={value} separator="," />

const Home = () => {
    const alertMessage =
        'Thống kê hệ thống đã được cập nhật vào ' + new Date().toLocaleString()

    const twoColors = {
        '0%': '#108ee9',
        '100%': '#87d068'
    }
    const conicColors = {
        '0%': '#87d068',
        '50%': '#ffe58f',
        '100%': '#ffccc7'
    }

    return (
        <Flex vertical gap={16}>
            <Alert
                message={alertMessage}
                type="success"
                closable
                showIcon
                icon={<SmileOutlined />}
            />
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Lượt nghe hôm nay"
                            value={11.28}
                            precision={2}
                            valueStyle={{
                                color: '#3f8600'
                            }}
                            prefix={<ArrowUpOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Lượt truy cập hôm nay"
                            value={9.3}
                            precision={2}
                            valueStyle={{
                                color: '#cf1322'
                            }}
                            prefix={<ArrowDownOutlined />}
                            suffix="%"
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Lượt thích"
                            value={1128}
                            prefix={<LikeOutlined />}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title="Đánh giá trung bình"
                            value={93}
                            suffix="/ 100"
                            formatter={formatter}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title={
                                <Flex gap={8} align="center">
                                    <span>Đang online</span>
                                    <span>
                                        <div
                                            style={{
                                                width: 10,
                                                height: 10,
                                                borderRadius: '50%',
                                                backgroundColor: '#52c41a'
                                            }}
                                        />
                                    </span>
                                </Flex>
                            }
                            value={425}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic
                            title={
                                <Flex gap={8} align="center">
                                    <span>Đang nghe</span>
                                    <span>
                                        <CustomerServiceOutlined />
                                    </span>
                                </Flex>
                            }
                            value={230}
                            precision={2}
                            formatter={formatter}
                        />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <Flex justify="space-between" wrap>
                            <Flex vertical gap={16}>
                                <Progress
                                    type="dashboard"
                                    percent={90}
                                    strokeColor={twoColors}
                                    showInfo
                                />
                                <p>Thống kê hệ thống</p>
                            </Flex>
                            <Flex vertical gap={16}>
                                <Progress
                                    type="dashboard"
                                    percent={70}
                                    strokeColor={conicColors}
                                    showInfo
                                />
                                <p>Thống kê người dùng</p>
                            </Flex>
                            <Flex vertical gap={16}>
                                <Progress
                                    type="dashboard"
                                    percent={93}
                                    strokeColor={conicColors}
                                />
                                <p>Thống kê bài hát</p>
                            </Flex>
                        </Flex>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <HomeCharts />
                    </Card>
                </Col>
            </Row>
        </Flex>
    )
}

export default Home
