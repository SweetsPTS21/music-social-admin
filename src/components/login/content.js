import React, { useState } from 'react'
import { Button, Checkbox, Form, Input, Layout, Typography } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { loginStart } from '../../redux/actions/login/actions'
import { useDispatch } from 'react-redux'

const LoginContent = () => {
    const dispatch = useDispatch()
    const [form] = Form.useForm()
    const [rememberMe, setRememberMe] = useState(true)

    const onFinish = (values) => {
        console.log('Received values of form: ', values)
        dispatch(
            loginStart({
                email: values.email,
                password: values.password,
                rememberMe
            })
        )
        //(values.email, values.password, rememberMe)
    }

    return (
        <Layout.Content className={'bg-white w-full'}>
            <Form
                form={form}
                onFinish={onFinish}
                className={'flex justify-center items-center'}
            >
                <div
                    className={'flex flex-col rounded-lg'}
                    style={{ maxWidth: 600 }}
                >
                    <h2 className={'text-4xl font-bold text-left mb-7'}>
                        Welcome to Music Social
                    </h2>
                    <Typography.Text className={'text-lg mb-4'}>
                        To get started, please sign in
                    </Typography.Text>
                    <div className={'flex flex-col flex-1 justify-between'}>
                        <div className={'flex flex-col'}>
                            <Form.Item
                                name={'email'}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Vui lòng nhập email hoặc số điện thoại hợp lệ.'
                                    }
                                ]}
                            >
                                <Input
                                    size={'large'}
                                    placeholder={'Email hoặc số điện thoại'}
                                    className={'input-outlined-dark'}
                                />
                            </Form.Item>
                            <Form.Item
                                name={'password'}
                                rules={[
                                    {
                                        required: true,
                                        message:
                                            'Mật khẩu của bạn phải chứa từ 4 đến 60 ký tự.'
                                    }
                                ]}
                            >
                                <Input.Password
                                    size={'large'}
                                    placeholder={'Mật khẩu'}
                                    className={'input-outlined-dark'}
                                />
                            </Form.Item>

                            <Button
                                type={'primary'}
                                size={'large'}
                                className={'w-full py-2 rounded-lg'}
                                onClick={() => {
                                    form.submit()
                                }}
                            >
                                Đăng nhập
                            </Button>
                            <div
                                className={
                                    'flex justify-center items-center mt-4'
                                }
                            >
                                <Link to={'#'} className={' text-base'}>
                                    Bạn quên mật khẩu?
                                </Link>
                            </div>
                        </div>
                        <div
                            className={'flex flex-col items-start gap-3 mb-20'}
                        >
                            <Checkbox
                                className={''}
                                checked={rememberMe}
                                onChange={(e) => {
                                    setRememberMe(e.target.checked)
                                }}
                            >
                                Ghi nhớ đăng nhập
                            </Checkbox>
                            <span className={''}>
                                <span>Bạn mới tham gia Netflix? </span>
                                <Link to={'/signup'} className={' font-bold'}>
                                    Đăng ký ngay.
                                </Link>
                            </span>
                            <span>
                                <span className={'text-sm text-[#8c8c8c]'}>
                                    Trang này được Google reCAPTCHA bảo vệ để
                                    đảm bảo bạn không phải là robot.
                                </span>
                                <Link to={'#'} className={'text-blue-800'}>
                                    Tìm hiểu thêm.
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </Form>
        </Layout.Content>
    )
}

export default LoginContent
