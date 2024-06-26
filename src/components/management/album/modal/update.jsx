import React, { useEffect, useState } from 'react'
import { useAlbumContext } from '../../../../context/useAlbumContext'
import { Button, Col, Flex, Form, Input, message, Modal, Row, Tabs } from 'antd'
import _ from 'lodash'
import { createAlbum, updateAlbum } from '../../../../api/album/api'
import UploadImages from '../../components/UploadImages'
import ArtistSelect from '../../components/ArtistSelect'
import AddSongs from './addSongs'
import { useManagementContext } from '../../../../context/useManagementContext'

const UpdateAlbumModal = () => {
    const {
        openEditModal,
        changeEditModalState,
        editModalState: currentAlbum,
        modalMode
    } = useAlbumContext()

    const { fetchAlbumData } = useManagementContext()

    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [currentTab, setCurrentTab] = useState('update')

    const delayFn = _.debounce((values) => {
        setUpdateLoading(true)
        const newData = new FormData()
        newData.append('title', values?.title)
        newData.append('caption', values?.caption)
        newData.append('description', values?.description)
        newData.append('artistId', values?.artistIds || currentAlbum?.artistIds)

        if (values?.fileThumbnail) {
            newData.append('thumbnail', values?.fileThumbnail)
        }

        if (modalMode === 'add') {
            createAlbum(newData)
                .then((r) => {
                    changeEditModalState({})
                    message.success('Movie added successfully').then((r) => r)
                })
                .finally(() => {
                    fetchAlbumData()
                    setUpdateLoading(false)
                })
        } else if (modalMode === 'update') {
            updateAlbum(currentAlbum?.id, newData)
                .then((res) => {
                    changeEditModalState({})
                    if (res?.status !== 403) {
                        message
                            .success('Movie updated successfully')
                            .then((r) => r)
                    }
                })
                .finally(() => {
                    fetchAlbumData()
                    setUpdateLoading(false)
                })
        }
    }, 500)

    const onFinish = (values) => {
        if (!values) return

        if (currentTab === 'update') {
            delayFn(values)
        } else {
            changeEditModalState({})
        }
    }

    useEffect(() => {
        setFormValues(currentAlbum)
    }, [currentAlbum])

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

    const UpdateForm = () => {
        return (
            <Form
                form={form}
                layout="vertical"
                initialValues={currentAlbum}
                onFinish={onFinish}
                className={'p-6'}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Flex vertical wrap={'wrap'}>
                            <UploadImages
                                images={currentAlbum?.thumbnail}
                                form={form}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Title"
                            name="title"
                            rules={[
                                { required: true, message: 'Title is required' }
                            ]}
                        >
                            <Input
                                placeholder="Title"
                                value={currentAlbum?.title}
                            />
                        </Form.Item>
                        <Form.Item label="Caption" name="caption">
                            <Input
                                placeholder="Caption"
                                value={currentAlbum?.caption}
                            />
                        </Form.Item>
                        <Form.Item label="Description" name="description">
                            <Input
                                placeholder="Description"
                                value={currentAlbum?.description}
                            />
                        </Form.Item>

                        <ArtistSelect value={currentAlbum?.artist} />

                        <Form.Item label="Likes" name="likes">
                            <Input
                                placeholder="Likes"
                                value={currentAlbum?.likes}
                            />
                        </Form.Item>
                    </Col>
                </Row>
            </Form>
        )
    }

    const tabItems = [
        {
            key: 'update',
            label: 'Update album',
            children: <UpdateForm />
        },
        modalMode == 'update' && {
            key: 'add',
            label: 'Song list',
            children: <AddSongs />
        }
    ]

    const handleChangeTab = (key) => {
        setCurrentTab(key)
    }

    const handleClearAll = () => {
        if (formValues) {
            form.resetFields()
            setFormValues(null)
        }
    }

    return (
        <Modal
            title={modalMode === 'add' ? 'Add new album' : 'Update album'}
            open={openEditModal}
            onOk={() => onOk()}
            onCancel={() => onCancel()}
            width={800}
            footer={
                <Flex
                    justify={modalMode === 'add' ? 'space-between' : 'flex-end'}
                >
                    {modalMode === 'add' && (
                        <Button type="primary" danger onClick={handleClearAll}>
                            Clear all
                        </Button>
                    )}
                    {currentTab === 'update' && (
                        <Button
                            type="primary"
                            htmlType="submit"
                            onClick={() => form.submit()}
                            loading={updateLoading}
                        >
                            Update
                        </Button>
                    )}
                </Flex>
            }
        >
            <Tabs items={tabItems} type={'card'} onChange={handleChangeTab} />
        </Modal>
    )
}

export default UpdateAlbumModal
