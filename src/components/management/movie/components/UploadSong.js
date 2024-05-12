import React, { useState } from 'react'
import { UploadOutlined } from '@ant-design/icons'
import { Button, Flex, Form, message, Upload } from 'antd'
import { getBase64 } from '../utils'

const beforeUpload = (file) => {
    const isMp3 = file.type === 'audio/mpeg'
    if (!isMp3) {
        message.error('You can only upload MP3 file!')
    }
    const isLt2M = file.size / 1024 / 1024 < 20
    if (!isLt2M) {
        message.error('Image must smaller than 20MB!')
    }
    return isMp3 && isLt2M
}

const UploadSong = ({ audio, form }) => {
    const [loading, setLoading] = useState(false)
    const [audioFileList, setAudioFileList] = useState([
        {
            uid: '-1',
            name: 'audio.mp3',
            status: 'done',
            url: audio
        }
    ])

    const handleChange = (info) => {
        console.log('info', info)

        setAudioFileList([
            {
                uid: info?.file?.uid,
                name: info?.file?.name,
                status: 'done',
                url: ''
            }
        ])
    }

    const handleUpload = async (file) => {
        // try {
        //     const response = await uploadThumbnail(file)
        //     const imageUrl = response?.path
        //     setImageUrl(imageUrl)
        //     message.success('Image uploaded successfully')
        // } catch (error) {
        //     console.error('Error uploading image:', error)
        //     message.error('Failed to upload image')
        // }
        if (file && form) {
            form.setFieldsValue({
                fileAudio: file.file
            })
        }

        console.log('file', file)
    }

    return (
        <Form.Item label={'Upload Song'} name="fileAudio">
            <Flex vertical gap={16}>
                {audio && (
                    <Flex>
                        <audio controls>
                            <source src={audio} type="audio/mpeg" />
                            Your browser does not support the audio element.
                        </audio>
                    </Flex>
                )}
                <Upload
                    name="file"
                    customRequest={(file) => handleUpload(file)}
                    beforeUpload={beforeUpload}
                    onChange={handleChange}
                    defaultFileList={audioFileList}
                    fileList={audioFileList}
                >
                    <Button title={'Upload a song'} icon={<UploadOutlined />}>
                        Click to Upload
                    </Button>
                </Upload>
            </Flex>
        </Form.Item>
    )
}

export default UploadSong
