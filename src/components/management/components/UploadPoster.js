import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Form, Image, message, Upload } from 'antd'
import { getBase64 } from '../movie/utils'

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png'
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 2
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!')
    }
    return isJpgOrPng && isLt2M
}

const UploadPoster = ({ poster, form }) => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false)
                setImageUrl(url)
            }).then((r) => r)
        }
    }

    const uploadButton = (
        <button
            style={{
                border: 0,
                background: 'none'
            }}
            type="button"
        >
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8
                }}
            >
                Upload
            </div>
        </button>
    )

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
    }

    const handleUpload = async (file) => {
        if (file && form) {
            form.setFieldsValue({
                fileThumbnail: file.file
            })
        }
    }

    return (
        <>
            <Form.Item name="fileThumbnail">
                <div className={'poster-upload'}>
                    <Upload
                        listType="picture-card"
                        showUploadList={false}
                        customRequest={(file) => handleUpload(file)}
                        beforeUpload={beforeUpload}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    />
                </div>
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
        </>
    )
}

export default UploadPoster
