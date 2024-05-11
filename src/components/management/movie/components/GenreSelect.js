import { Form, Select } from 'antd'
import React, { useEffect, useState } from 'react'
import { useSongsContext } from '../../../../context/useSongsContext'

const { Option } = Select

export const GenreSelect = ({ value }) => {
    const { songGenres } = useSongsContext()

    return (
        <Form.Item
            label="Genres"
            name="genresArr"
            rules={[
                {
                    required: true,
                    message: 'Genres is required'
                }
            ]}
        >
            <Select
                mode="multiple"
                placeholder="Genres"
                value={value}
                title={'select'}
            >
                {songGenres?.map((item) => (
                    <Option key={item?.id} value={item?.id}>
                        {item?.genre}
                    </Option>
                ))}
            </Select>
        </Form.Item>
    )
}
