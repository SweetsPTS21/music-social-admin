import React from 'react'
import { Button, Layout, Select } from 'antd'
import mainLogo from '../../assets/icon/logo.png'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'

const Header = (props) => {
    return (
        <Layout.Header className={'w-full bg-white'}>
            <div className={'flex justify-between items-center w-full'}>
                {/*<div className={'w-[120px] h-[64px]'}>*/}
                {/*    <Link to={'/'}>*/}
                {/*        <img*/}
                {/*            src={mainLogo}*/}
                {/*            alt={'Netflix logo'}*/}
                {/*            className={'w-[120px] h-[64px] cursor-pointer'}*/}
                {/*        />*/}
                {/*    </Link>*/}
                {/*</div>*/}
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
