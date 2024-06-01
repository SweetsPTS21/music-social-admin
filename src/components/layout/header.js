import React from 'react'
import { Flex, Layout, Select } from 'antd'
import appLogo from '../../assets/icon/mslogo.png'

const Header = () => {
    return (
        <Layout.Header
            className={'bg-white p-3 w-full'}
            style={{
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.09)'
            }}
        >
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

export default Header
