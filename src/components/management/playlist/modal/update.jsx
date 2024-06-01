import React, { useEffect, useState } from 'react'
import { Button, Col, Flex, Form, Input, message, Modal, Row, Tabs } from 'antd'
import { usePlaylistContext } from '../../../../context/usePlaylistContext'
import UploadImages from '../../components/UploadImages'
import _ from 'lodash'
import { createPlaylist, updatePlaylist } from '../../../../api/playlist/api'
import AddSongs from './addSongs'
import { useManagementContext } from '../../../../context/useManagementContext'
import defaultImg from '../../../../assets/img/200.png'

const UpdatePlaylistModal = () => {
    const { fetchPlaylistData } = useManagementContext()
    const {
        openEditModal,
        changeEditModalState,
        editModalState: currentPlaylist,
        modalMode
    } = usePlaylistContext()

    const [form] = Form.useForm()
    const [formValues, setFormValues] = useState(null)
    const [updateLoading, setUpdateLoading] = useState(false)
    const [currentTab, setCurrentTab] = useState('update')

    const delayFn = _.debounce((values) => {
        setUpdateLoading(true)
        const newData = new FormData()
        newData.append('name', values?.name)

        if (values?.fileThumbnail) {
            newData.append('fileThumbnail', values?.fileThumbnail)
        }

        newData.append('publish', true)

        if (modalMode === 'add') {
            createPlaylist(newData)
                .then((r) => {
                    console.log('r', r)
                    changeEditModalState({})
                    message.success('Movie added successfully').then((r) => r)
                })
                .finally(() => {
                    fetchPlaylistData()
                    setUpdateLoading(false)
                })
        } else if (modalMode === 'update') {
            updatePlaylist(currentPlaylist?.id, newData)
                .then((r) => {
                    console.log('r', r)
                    changeEditModalState({})
                    message.success('Movie updated successfully').then((r) => r)
                })
                .finally(() => {
                    fetchPlaylistData()
                    setUpdateLoading(false)
                })
        }
    }, 500)

    const onFinish = (values) => {
        if (!values) return

        delayFn(values)
    }

    useEffect(() => {
        setFormValues(currentPlaylist)
    }, [currentPlaylist])

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

    const handleChangeTab = (key) => {
        setCurrentTab(key)
    }

    const UpdateForm = () => {
        return (
            <Form
                form={form}
                layout="vertical"
                initialValues={currentPlaylist}
                onFinish={onFinish}
                className={'p-6'}
            >
                <Row gutter={16}>
                    <Col span={12}>
                        <Flex vertical wrap={'wrap'}>
                            <UploadImages
                                images={currentPlaylist?.thumbnail}
                                form={form}
                            />
                        </Flex>
                    </Col>
                    <Col span={12}>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: 'Name is required' }
                            ]}
                        >
                            <Input
                                placeholder="Name"
                                value={currentPlaylist?.name}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Creator"
                            name="creator"
                            rules={[
                                {
                                    required: true,
                                    message: 'Creator is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Creator"
                                value={currentPlaylist?.creator}
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
            </Form>
        )
    }

    const tabItems = [
        {
            key: 'update',
            label: 'Update album',
            children: <UpdateForm />
        },
        {
            key: 'add',
            label: 'Song list',
            children: <AddSongs />
        }
    ]

    return (
        <Modal
            title={modalMode === 'add' ? 'Add new playlist' : 'Update playlist'}
            open={openEditModal}
            onOk={() => onOk()}
            onCancel={() => onCancel()}
            width={800}
            footer={null}
        >
            <Tabs items={tabItems} type={'card'} onChange={handleChangeTab} />
        </Modal>
    )
}

export default UpdatePlaylistModal
