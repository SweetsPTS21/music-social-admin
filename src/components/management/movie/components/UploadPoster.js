import React, { useState } from 'react'
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons'
import { Flex, Form, message, Upload } from 'antd'
import { getBase64 } from '../utils'
import { BASE_UPLOAD } from '../../../../config/url'
import { uploadThumbnail } from '../../../../api/music/api'

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

const UploadPoster = ({ poster }) => {
    const [loading, setLoading] = useState(false)
    const [imageUrl, setImageUrl] = useState(null)

    console.log('poster', poster)

    const handleChange = (info) => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
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

    const handleUpload = async (file) => {
        try {
            const response = await uploadThumbnail(file)
            const imageUrl = response?.path
            setImageUrl(imageUrl)
            message.success('Image uploaded successfully')
        } catch (error) {
            console.error('Error uploading image:', error)
            message.error('Failed to upload image')
        }
    }

    return (
        <Form.Item name="posters">
            <div className={'poster-upload'}>
                <Upload
                    name="avatar"
                    listType="picture-card"
                    showUploadList={false}
                    customRequest={(file) => handleUpload(file)}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                >
                    {poster ? (
                        <img
                            src={poster}
                            alt="avatar"
                            style={{
                                width: '100%'
                            }}
                        />
                    ) : (
                        uploadButton
                    )}
                </Upload>
            </div>
        </Form.Item>
    )
}

export default UploadPoster
