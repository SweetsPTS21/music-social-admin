import React from 'react'
import mslogo from '../../../assets/icon/mslogo.png'
import { Flex, Typography } from 'antd'
import { Link } from 'react-router-dom'

const { Text } = Typography

const SideHeader = ({ collapsed }) => {
    return (
        <Flex
            gap={10}
            align={'center'}
            style={{
                margin: '20px 0',
                padding: '0 15px'
            }}
        >
            <Link to="/management/home">
                <div
                    style={{
                        width: 50,
                        height: 50
                    }}
                >
                    <img src={mslogo} alt="logo" style={{ width: '100%' }} />
                </div>
            </Link>
            {!collapsed && (
                <Text
                    style={{
                        color: '#169bff',
                        fontSize: 20,
                        fontWeight: 'bold'
                    }}
                >
                    Music Social
                </Text>
            )}
        </Flex>
    )
}

export default SideHeader
