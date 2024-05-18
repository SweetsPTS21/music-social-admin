import React from 'react'
import { Flex, Layout, Select } from 'antd'
import PropTypes from 'prop-types'
import appLogo from '../../assets/icon/mslogo.png'

const Header = (props) => {
    return (
        <Layout.Header className={'bg-white p-4 w-full'}>
            <Flex
                justify={'space-between'}
                align={'center'}
                className={'w-[80%]'}
                style={{ margin: '0 auto' }}
            >
                <div className={'flex gap-4 items-center'}>
                    <img src={appLogo} alt={'logo'} className={'h-10'} />
                </div>
                <div className={'flex gap-4 items-center'}>
                    <Select defaultValue={'vi'}>
                        <Select.Option value={'vi'}>Tiếng Việt</Select.Option>
                        <Select.Option value={'en'}>Tiếng Anh</Select.Option>
                    </Select>
                </div>
            </Flex>
        </Layout.Header>
    )
}
Header.propTypes = {
    type: PropTypes.string,
    width: PropTypes.string,
    bgColor: PropTypes.string
}

Header.defaultProps = {
    type: 'home',
    width: '100%',
    bgColor: 'transparent'
}

export default Header
