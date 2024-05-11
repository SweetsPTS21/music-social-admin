import { Form, Select } from 'antd'
import React from 'react'
import { useSongsContext } from '../../../../context/useSongsContext'

const { Option } = Select

export const TagSelect = ({ value }) => {
    const { songTags } = useSongsContext()
    return (
        <Form.Item
            label="Tags"
            name="tagsArr"
            rules={[
                {
                    required: true,
                    message: 'Tags is required'
                }
            ]}
        >
            <Select mode="multiple" placeholder="Tags" value={value}>
                {songTags?.map((item) => (
                    <Option key={item?.id} value={item?.id}>
                        {item?.tag}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}
