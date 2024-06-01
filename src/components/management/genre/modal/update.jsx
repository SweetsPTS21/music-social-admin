import React, { useEffect, useState } from 'react'
import { Button, Col, Flex, Form, Input, Modal, Row } from 'antd'
import { useGenreContext } from '../../../../context/useGenreContext'
import UploadImages from '../../components/UploadImages'
import { createGenre, updateGenre } from '../../../../api/genre/api'
import { useManagementContext } from '../../../../context/useManagementContext'
import { message } from 'antd'

const UpdateGenreModal = () => {
    const { fetchSongGenres } = useManagementContext()
    const {
        openEditModal,
        changeEditModalState,
        editModalState: currentGenre,
        modalMode,
        setModalMode
    } = useGenreContext()

    const [form] = Form.useForm()
    const [updateLoading, setUpdateLoading] = useState(false)
    const [currentTab, setCurrentTab] = useState('update')
    const initialValues = {
        genre: '',
        thumbnail: []
    }

    useEffect(() => {
        form.setFieldsValue(currentGenre)
    }, [currentGenre])

    const handleClearAll = () => {
        form.setFieldsValue(initialValues)
    }

    const onFinish = async (values) => {
        const newData = new FormData()
        newData.append('name', values?.genre)

        if (values?.fileThumbnail) {
            newData.append('thumbnail', values?.fileThumbnail)
        }

        if (modalMode === 'add') {
            setUpdateLoading(true)
            createGenre(newData)
                .then(() => {
                    changeEditModalState({})
                    message.success('Genre added successfully').then((r) => r)
                })
                .finally(() => {
                    fetchSongGenres()
                    setUpdateLoading(false)
                })
        } else if (modalMode === 'update') {
            updateGenre(currentGenre?.id, newData)
                .then(() => {
                    changeEditModalState({})
                    message.success('Genre updated successfully').then((r) => r)
                })
                .finally(() => {
                    fetchSongGenres()
                    setUpdateLoading(false)
                })
        }
    }

    const onOk = () => {
        form.submit()
    }

    const onCancel = () => {
        changeEditModalState({})
        setModalMode(null)
    }

    console.log('currentGenre', currentGenre)

    return (
        <Modal
            title={modalMode === 'add' ? 'Add new genre' : 'Update genre'}
            open={openEditModal}
            onOk={() => onOk()}
            onCancel={() => onCancel()}
            width={500}
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
            <Form
                form={form}
                layout="vertical"
                initialValues={currentGenre}
                onFinish={onFinish}
                className={'p-6'}
            >
                <Row gutter={16}>
                    <Col span={24}>
                        <Flex vertical wrap={'wrap'}>
                            <UploadImages
                                images={currentGenre?.thumbnail}
                                form={form}
                            />
                            <Form.Item
                                label="Name"
                                name="genre"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Name is required'
                                    }
                                ]}
                            >
                                <Input
                                    placeholder="Name of genre"
                                    value={currentGenre?.genre}
                                />
                            </Form.Item>
                        </Flex>
                    </Col>
                </Row>
            </Form>
        </Modal>
    )
}

export default UpdateGenreModal
