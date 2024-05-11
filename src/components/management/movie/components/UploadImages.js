import React, { useEffect, useState } from 'react'
import { Upload, Image, Form } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import { getBase64 } from '../utils'
import ImgCrop from 'antd-img-crop'
import { BASE_UPLOAD } from '../../../../config/url'
import { uploadThumbnail } from '../../../../api/music/api'

const UploadImages = ({ images }) => {
    const [previewOpen, setPreviewOpen] = useState(false)
    const [previewImage, setPreviewImage] = useState('')
    const [fileList, setFileList] = useState([])

    useEffect(() => {
        if (images?.length > 0) {
            const list = images.map((image, index) => ({
                uid: index,
                name: 'Image' + index,
                status: 'done',
                url: image
            }))
            setFileList(list)
        }
    }, [images])

    const handlePreview = async (file) => {
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj)
        }
        setPreviewImage(file.url || file.preview)
        setPreviewOpen(true)
    }

    const handleChange = ({ fileList: newFileList }) => setFileList(newFileList)

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

    return (
        <>
            <Form.Item label="Images" name="images">
                <ImgCrop rotationSlider>
                    <Upload
                        action={uploadThumbnail}
                        listType="picture-card"
                        fileList={fileList}
                        onPreview={handlePreview}
                        onChange={handleChange}
                    >
                        {fileList.length >= 8 ? null : uploadButton}
                    </Upload>
                </ImgCrop>
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

export default UploadImages
