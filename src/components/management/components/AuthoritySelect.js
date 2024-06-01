import { Form, Select } from 'antd'
import React from 'react'

const { Option } = Select

export const AuthoritySelect = ({ value }) => {
    const authorities = ['ROLE_USER', 'ROLE_ADMIN', 'ROLE_ARTIST']

    return (
        <Form.Item
            label="Authorities"
            name="authorities"
            rules={[
                {
                    required: true,
                    message: 'Authorities is required'
                }
            ]}
        >
            <Select
                mode="multiple"
                placeholder="Authorities"
                value={value}
                title={'select'}
            >
                {authorities?.map((item) => (
                    <Option key={item} value={item}>
                        {item}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}
