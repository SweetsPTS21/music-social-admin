import React, { useEffect, useState } from 'react'
import { Button, Col, Flex, Form, Input, Modal, Row, Typography } from 'antd'
import { GenreSelect } from '../../components/GenreSelect'
import { message } from 'antd'
import _ from 'lodash'
import UploadImages from '../../components/UploadImages'
import { useSongsContext } from '../../../../context/useSongsContext'
import { createSong, updateSong } from '../../../../api/music/api'
import { TagSelect } from '../../components/TagSelect'
import UploadSong from '../../components/UploadSong'
import { useManagementContext } from '../../../../context/useManagementContext'

const { TextArea } = Input
const { Text } = Typography

const UpdateSongModal = () => {
    const { fetchSongsData } = useManagementContext()
    const {
        openEditModal,
        changeEditModalState,
        editModalState: currentSong,
        modalMode
    } = useSongsContext()
    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)

    const delayFn = _.debounce((values) => {
        setUpdateLoading(true)
        const newData = new FormData()
        newData.append('name', values?.name)
        newData.append('artist', values?.artist)
        newData.append('caption', values?.caption)
        newData.append('description', values?.description)
        newData.append('genresIds', values?.genresArr?.join(','))
        newData.append('tagIds', values?.tagsArr?.join(','))

        if (values?.fileAudio) {
            newData.append('fileAudio', values?.fileAudio)
        }

        if (values?.fileThumbnail) {
            newData.append('fileThumbnail', values?.fileThumbnail)
        }

        newData.append('publish', true)

        if (modalMode === 'add') {
            createSong(newData)
                .then(() => {
                    changeEditModalState({})
                })
                .finally(() => {
                    fetchSongsData()
                    setUpdateLoading(false)
                })
        } else if (modalMode === 'update') {
            updateSong(currentSong?.id, newData)
                .then((res) => {
                    changeEditModalState({})
                    if (res?.status !== 403) {
                        message.success('Update song successfully')
                    }
                })
                .finally(() => {
                    fetchSongsData()
                    setUpdateLoading(false)
                })
        }
    }, 500)

    const onFinish = (values) => {
        if (!values) return

        delayFn(values)
    }

    useEffect(() => {
        setFormValues(currentSong)
    }, [currentSong])

    useEffect(() => {
        if (formValues) {
            form.setFieldsValue(formValues)
        }
    }, [formValues])

    const onOk = () => {
        changeEditModalState({})
    }

    const onCancel = () => {
        changeEditModalState({})
    }

    return (
        <Modal
            title={modalMode === 'add' ? 'Add new song' : 'Update song'}
            open={openEditModal}
            onOk={() => onOk()}
            onCancel={() => onCancel()}
            width={800}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={currentSong}
                onFinish={onFinish}
                className={'p-6'}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Flex vertical wrap={'wrap'}>
                            <UploadImages
                                images={currentSong?.thumbnail}
                                form={form}
                            />

                            <UploadSong
                                audio={currentSong?.audio?.path}
                                form={form}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Flex className={'mb-6'}>
                            <Text strong style={{ fontSize: '1.5rem' }}>
                                Song Info
                            </Text>
                        </Flex>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: 'Name is required' }
                            ]}
                        >
                            <Input
                                placeholder="Title"
                                value={currentSong?.name}
                            />
                        </Form.Item>

                        <GenreSelect value={currentSong?.genresArr} />

                        <TagSelect value={currentSong?.tagsArr} />

                        <Form.Item label="Description" name="description">
                            <Input
                                placeholder="Description"
                                value={currentSong?.description}
                            />
                        </Form.Item>
                        <Form.Item label="Artist" name="artist">
                            <Input
                                placeholder="Artist"
                                value={currentSong?.artist}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Caption"
                            name="caption"
                            tooltip={'Max 200 characters'}
                        >
                            <TextArea
                                placeholder="Caption"
                                value={currentSong?.caption}
                                maxLength={200}
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

export default UpdateSongModal
