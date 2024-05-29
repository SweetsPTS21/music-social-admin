import React, { useEffect, useState } from 'react'
import { Button, Col, Flex, Form, Input, Modal, Row } from 'antd'
import { useGenreContext } from '../../../../context/useGenreContext'
import UploadImages from '../../components/UploadImages'

const UpdateGenreModal = () => {
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

    const onFinish = (values) => {
        console.log('values', values)
    }

    const onOk = () => {
        form.submit()
    }

    const onCancel = () => {
        changeEditModalState({})
        setModalMode(null)
    }

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
