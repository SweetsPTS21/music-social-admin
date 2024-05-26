import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { homeFooter } from '../../resources/home/home'
import { Layout } from 'antd'

const HomeFooter = () => {
    return (
        <Layout.Footer className={'flex justify-center w-full z-10'}>
            <p style={{ color: '#6d6e6f' }}>
                Bạn có câu hỏi? Liên hệ với chúng tôi.
            </p>
            <div>
                {homeFooter?.map((item) => {
                    return (
                        <Link
                            to={'/'}
                            key={item?.key}
                            className={'mt-4 ml-3 p-0 w-full cursor-pointer'}
                            style={{
                                color: '#fff',
                                flex: '0 0 calc(25% - 0.75em)'
                            }}
                        >
                            <span style={{ color: '#6d6e6f' }}>
                                {item?.label}
                            </span>
                        </Link>
                    )
                })}
            </div>
        </Layout.Footer>
    )
}

export default HomeFooter
