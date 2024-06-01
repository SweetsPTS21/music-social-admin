import React, { useEffect, useState } from 'react'
import { useUserContext } from '../../../../context/useUserContext'
import {
    Button,
    Col,
    Flex,
    Form,
    Input,
    message,
    Modal,
    Radio,
    Row
} from 'antd'
import _ from 'lodash'
import { createUser, updateUser } from '../../../../api/user/api'
import UploadImages from '../../components/UploadImages'
import { AuthoritySelect } from '../../components/AuthoritySelect'

const UpdateUserModal = () => {
    const {
        openEditModal,
        changeEditModalState,
        editModalState: currentUser,
        fetchUserData,
        modalMode
    } = useUserContext()

    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    console.log('currentUser', currentUser)

    const delayFn = _.debounce((values) => {
        setUpdateLoading(true)
        const newData = new FormData()
        newData.append('firstName', values?.firstName)
        newData.append('lastName', values?.lastName)
        newData.append('email', values?.email)
        newData.append('login', values?.login)
        newData.append('authorities', values?.authorities)
        newData.append('activated', values?.activated)

        if (values?.fileThumbnail) {
            newData.append('avatar', values?.fileThumbnail)
        }

        if (modalMode === 'add') {
            createUser(newData)
                .then((r) => {
                    console.log('r', r)
                    changeEditModalState({})
                    message.success('User added successfully').then((r) => r)
                })
                .finally(() => {
                    fetchUserData()
                    setUpdateLoading(false)
                })
        } else if (modalMode === 'update') {
            updateUser(currentUser?.id, newData)
                .then((r) => {
                    console.log('r', r)
                    changeEditModalState({})
                    message.success('User updated successfully').then((r) => r)
                })
                .finally(() => {
                    fetchUserData()
                    setUpdateLoading(false)
                })
        }
    }, 500)

    useEffect(() => {
        setFormValues(currentUser)
    }, [currentUser])

    useEffect(() => {
        if (formValues) {
            form.setFieldsValue(formValues)
        }
    }, [formValues])

    const onFinish = (values) => {
        if (!values) return

        delayFn(values)
    }

    const onOk = () => {
        changeEditModalState({})
    }

    const onCancel = () => {
        changeEditModalState({})
    }
    return (
        <Modal
            title={modalMode === 'add' ? 'Add new user' : 'Update user'}
            open={openEditModal}
            onOk={() => onOk()}
            onCancel={() => onCancel()}
            width={800}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={currentUser}
                onFinish={onFinish}
                className={'p-6'}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Flex vertical wrap={'wrap'}>
                            <UploadImages
                                images={currentUser?.imageUrl}
                                form={form}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="First Name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'First is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="First Name"
                                value={currentUser?.firstName}
                            />
                        </Form.Item>

                        <AuthoritySelect value={currentUser?.genresArr} />

                        <Form.Item label="Last Name" name="lastName">
                            <Input
                                placeholder="Last name"
                                value={currentUser?.lastName}
                            />
                        </Form.Item>
                        <Form.Item label="Email" name="email">
                            <Input
                                placeholder="Email"
                                value={currentUser?.email}
                            />
                        </Form.Item>
                        <Form.Item label="Account" name="login">
                            <Input
                                placeholder="Account"
                                value={currentUser?.login}
                            />
                        </Form.Item>
                        <Form.Item label="Active" name="activated">
                            <Radio.Group
                                value={currentUser?.activated}
                                options={[
                                    { label: 'Active', value: true },
                                    { label: 'Inactive', value: false }
                                ]}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Flex
                    justify={modalMode === 'add' ? 'space-between' : 'flex-end'}
                >
                    {modalMode === 'add' && (
                        <Button
                            type="primary"
                            danger
                            onClick={() => {
                                if (formValues) {
                                    form.resetFields()
                                    setFormValues(null)
                                }
                            }}
                        >
                            Clear all
                        </Button>
                    )}
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => form.submit()}
                        loading={updateLoading}
                    >
                        Update
                    </Button>
                </Flex>
            </Form>
        </Modal>
    )
}

export default UpdateUserModal
