import React, { useEffect, useState } from 'react'
import { Upload, Image, Form, Flex, Typography } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getBase64 } from '../utils'
import ImgCrop from 'antd-img-crop'

const { Text } = Typography

const UploadImages = ({ images, form }) => {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [fileList, setFileList] = useState([])

    useEffect(() => {
        if (images) {
            setFileList([
                {
                    uid: '-1',
                    name: 'Image',
                    status: 'done',
                    url: images
                }
            ])
        }
    }, [images])

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
    }

    const handleChange = ({ fileList: newFileList }) => {
        setFileList(
            newFileList?.map((file) => {
                return {
                    ...file,
                    status: 'done'
                }
            })
        )
    }

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none'
            }}
            type="button"
        >
            <PlusOutlined />
            <div
                style={{
                    marginTop: 8
                }}
            >
                Upload
            </div>
        </button>
    )

    const handleUpload = async (file) => {
        if (file && form) {
            form.setFieldsValue({
                fileThumbnail: file.file
            })
        }
    }

    return (
        <div className={'h-[300px]'}>
            <Form.Item name="fileThumbnail">
                <Flex align="center" justify={'center'} vertical>
                    <ImgCrop rotationSlider>
                        <Upload
                            customRequest={(file) => handleUpload(file)}
                            listType="picture-card"
                            fileList={fileList}
                            onPreview={handlePreview}
                            onChange={handleChange}
                            className={'ms-upload-song-image'}
                        >
                            {fileList.length >= 1 ? null : uploadButton}
                        </Upload>
                    </ImgCrop>
                    <Text type="secondary">Upload a thumbnail</Text>
                </Flex>
            </Form.Item>
            {previewImage && (
                <Image
                    wrapperStyle={{
                        display: 'none'
                    }}
                    preview={{
                        visible: previewOpen,
                        onVisibleChange: (visible) => setPreviewOpen(visible),
                        afterOpenChange: (visible) =>
                            !visible && setPreviewImage('')
                    }}
                    src={previewImage}
                />
            )}
        </div>
    )
}

export default UploadImages
