import { Form, Select } from 'antd'
import React from 'react'
import { useManagementContext } from '../../../context/useManagementContext'

const { Option } = Select

export const ArtistSelect = ({ value }) => {
    const { allArtist } = useManagementContext()

    return (
        <Form.Item
            label="Artist"
            name="artistIds"
            rules={[
                {
                    required: true,
                    message: 'Artist is required'
                }
            ]}
        >
            <Select
                mode="multiple"
                placeholder="Artist"
                value={value?.id}
                title={'select'}
            >
                {allArtist?.map((item) => (
                    <Option key={item?.id} value={item?.id}>
                        {item?.nickname}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}

export default ArtistSelect
