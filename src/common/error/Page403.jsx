import React from 'react'
import { Button, Result } from 'antd'
import { Link } from 'react-router-dom'
import { t } from 'i18next'

const Page403 = ({ href }) => {
    return (
        <Result
            status="403"
            title="403"
            subTitle={t('common.title403')}
            extra={
                <Button type="primary">
                    {href ? (
                        <a href={href}>{t('common.backHome')}</a>
                    ) : (
                        <Link to={'/workplace/work/home'}>
                            {t('common.backHome')}
                        </Link>
                    )}
                </Button>
            }
        />
    )
}

export default Page403
