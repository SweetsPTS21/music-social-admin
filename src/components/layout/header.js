import React from 'react'
import { Layout, Select } from 'antd'
import PropTypes from 'prop-types'

const Header = (props) => {
    return (
        <Layout.Header className={'w-full bg-white'}>
            <div className={'flex justify-between items-center w-full'}>
                <div className={'flex gap-4 items-center'}>
                    <Select defaultValue={'vi'}>
                        <Select.Option value={'vi'}>Tiếng Việt</Select.Option>
                        <Select.Option value={'en'}>Tiếng Anh</Select.Option>
                    </Select>
                </div>
            </div>
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
