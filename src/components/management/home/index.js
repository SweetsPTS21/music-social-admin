import React from 'react'
import {
    ArrowDownOutlined,
    ArrowUpOutlined,
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
        <Flex vertical>
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
                            title="Unmerged"
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
                        <Flex gap="small" wrap>
                            <Progress
                                type="dashboard"
                                percent={90}
                                strokeColor={twoColors}
                                showInfo
                            />
                            <Progress
                                type="dashboard"
                                percent={100}
                                strokeColor={twoColors}
                            />
                            <Progress
                                type="dashboard"
                                percent={93}
                                strokeColor={conicColors}
                            />
                        </Flex>
                    </Card>
                </Col>
                <Col span={12}>
                    <Card bordered={false}>
                        <Statistic title="Unmerged" value={93} />
                    </Card>
                </Col>
            </Row>
            <Row gutter={16}>
                <Col span={12}>
                    <Card bordered={false}>
                        <HomeCharts />
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
        </Flex>
    )
}

export default Home
