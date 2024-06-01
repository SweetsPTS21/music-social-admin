import React, { useEffect, useState } from 'react'
import { useArtistContext } from '../../../../context/useArtistContext'
import { Button, Col, Flex, Form, Input, message, Modal, Row } from 'antd'
import _ from 'lodash'
import { createArtist, updateArtist } from '../../../../api/artist/api'
import UploadImages from '../../components/UploadImages'
import { GenreSelect } from '../../components/GenreSelect'
import { useManagementContext } from '../../../../context/useManagementContext'
import defaultImg from '../../../../assets/img/200.png'

const UpdateArtistModal = () => {
    const { fetchArtistData } = useManagementContext()
    const {
        openEditModal,
        changeEditModalState,
        editModalState: currentArtist,
        modalMode
    } = useArtistContext()

    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    console.log('currentArtist', currentArtist)

    const delayFn = _.debounce((values) => {
        console.log('values', values)

        setUpdateLoading(true)
        const newData = new FormData()
        newData.append('nickname', values?.nickname)
        newData.append('country', values?.country)
        newData.append('description', values?.description)
        newData.append('websiteUrl', values?.website)
        newData.append('genreIds', values?.genresArr?.join(',') || '')

        if (values?.fileThumbnail) {
            newData.append('image', values?.fileThumbnail)
        }

        if (modalMode === 'add') {
            createArtist(newData)
                .then((r) => {
                    console.log('r', r)
                    changeEditModalState({})
                    message.success('Movie added successfully').then((r) => r)
                })
                .finally(() => {
                    fetchArtistData()
                    setUpdateLoading(false)
                })
        } else if (modalMode === 'update') {
            updateArtist(currentArtist?.id, newData)
                .then((r) => {
                    console.log('r', r)
                    changeEditModalState({})
                    message.success('Movie updated successfully').then((r) => r)
                })
                .finally(() => {
                    fetchArtistData()
                    setUpdateLoading(false)
                })
        }
    }, 500)

    useEffect(() => {
        setFormValues(currentArtist)
    }, [currentArtist])

    useEffect(() => {
        if (formValues) {
            form.setFieldsValue(formValues)
        }
    }, [formValues])

    const onFinish = (values) => {
        console.log('form', values)

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
            title={modalMode === 'add' ? 'Add new artist' : 'Update artist'}
            open={openEditModal}
            onOk={() => onOk()}
            onCancel={() => onCancel()}
            width={800}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={currentArtist}
                onFinish={onFinish}
                className={'p-6'}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Flex vertical wrap={'wrap'}>
                            <UploadImages
                                images={currentArtist?.image}
                                form={form}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Nickname"
                            name="nickname"
                            rules={[
                                {
                                    required: true,
                                    message: 'Nickname is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Nickname"
                                value={currentArtist?.nickname}
                            />
                        </Form.Item>

                        <GenreSelect value={currentArtist?.genresArr} />

                        <Form.Item label="Country" name="country">
                            <Input
                                placeholder="Country"
                                value={currentArtist?.country}
                            />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input
                                placeholder="Description"
                                value={currentArtist?.description}
                            />
                        </Form.Item>
                        <Form.Item label="Website" name="website">
                            <Input
                                placeholder="Website"
                                value={currentArtist?.website}
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

export default UpdateArtistModal
