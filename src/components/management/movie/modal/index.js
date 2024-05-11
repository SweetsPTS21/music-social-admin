import React, { useEffect, useState } from 'react'
import {
    Button,
    Col,
    DatePicker,
    Flex,
    Form,
    Input,
    Modal,
    Row,
    Select,
    Spin,
    Tooltip,
    Typography,
    Upload
} from 'antd'
import dayjs from 'dayjs'
// import { CREATE_MOVIE, UPDATE_MOVIE } from '../../../../api/graphql/movie'
// import { useMutation } from '@apollo/client'
import { GenreSelect } from '../components/GenreSelect'
import { message } from 'antd'
import _ from 'lodash'
import UploadImages from '../components/UploadImages'
import UploadPoster from '../components/UploadPoster'
import { createUser, updateUser } from '../../../../api/user/api'
import { useSongsContext } from '../../../../context/useSongsContext'
import { createSong, updateSong } from '../../../../api/music/api'
import { TagSelect } from '../components/TagSelect'

const UpdateSongModal = () => {
    const {
        openEditModal,
        changeEditModalState,
        editModalState: currentSong,
        fetchSongsData,
        modalMode
    } = useSongsContext()
    const [form] = Form.useForm()
    const [released, setReleased] = useState(dayjs())
    const [createLoading, setCreateLoading] = useState(false)
    const [updateLoading, setUpdateLoading] = useState(false)

    const delayFn = _.debounce((values) => {
        const newData = {
            title: values?.title,
            genre: values?.genre,
            rated: values?.rated,
            year: dayjs(released).format('YYYY'),
            released: dayjs(released).format('YYYY-MM-DD'),
            runtime: values?.runtime,
            director: values?.director,
            writer: values?.writer,
            actors: values?.actors,
            plot: values?.plot,
            languages: values?.languages,
            country: values?.country,
            awards: values?.awards,
            poster: values?.poster,
            metascore: Number(values?.metascore),
            imdbRating: values?.imdbRating,
            imdbVotes: values?.imdbVotes,
            type: values?.type,
            trailer: values?.trailer,
            response: true,
            images: currentSong?.images
        }

        if (modalMode === 'add') {
            createSong({
                variables: {
                    movie: newData
                }
            })
                .then((r) => {
                    console.log('r', r)
                    changeEditModalState({})
                    message.success('Movie added successfully').then((r) => r)
                })
                .finally(() => fetchSongsData())
        } else if (modalMode === 'update') {
            updateSong({
                variables: {
                    movieId: currentSong?.id,
                    movie: newData
                }
            })
                .then((r) => {
                    console.log('r', r)
                    changeEditModalState({})
                    message.success('Movie updated successfully').then((r) => r)
                })
                .finally(() => fetchSongsData())
        }
    }, 500)

    const onFinish = (values) => {
        console.log('form', values)

        if (!values) return

        delayFn(values)
    }

    useEffect(() => {
        if (!currentSong) return

        if (form) {
            setReleased(dayjs(currentSong?.released))
            form.setFieldsValue(currentSong)
        }
    }, [currentSong])

    return (
        <Modal
            title="Update Song"
            open={openEditModal}
            onOk={() => changeEditModalState({})}
            onCancel={() => changeEditModalState({})}
            width={1000}
            footer={null}
        >
            <Form
                form={form}
                layout="vertical"
                initialValues={currentSong}
                onFinish={onFinish}
                className={'p-6'}
            >
                <Row gutter={16}>
                    <Col span={6}>
                        <Flex vertical wrap={'wrap'}>
                            <UploadPoster
                                poster={currentSong?.thumbnail?.path}
                            />
                            <UploadImages images={currentSong?.images} />
                        </Flex>
                    </Col>
                    <Col span={9}>
                        <Typography.Text
                            style={{ fontSize: '1.5rem' }}
                            className={'mb-6'}
                        >
                            Song Info
                        </Typography.Text>
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[
                                { required: true, message: 'Name is required' }
                            ]}
                        >
                            <Input
                                placeholder="Title"
                                value={currentSong?.name}
                            />
                        </Form.Item>

                        <GenreSelect value={currentSong?.genresArr} />

                        <TagSelect value={currentSong?.tagsArr} />

                        <Form.Item
                            label="Creator"
                            name="creator"
                            rules={[
                                {
                                    required: true,
                                    message: 'Creator is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Creator"
                                value={currentSong?.creator}
                            />
                        </Form.Item>
                        <Form.Item label="Artist" name="artist">
                            <Input
                                placeholder="Artist"
                                value={currentSong?.artist}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Caption"
                            name="caption"
                            tooltip={'Max 200 characters'}
                        >
                            <Input.TextArea
                                placeholder="Caption"
                                value={currentSong?.caption}
                                maxLength={200}
                            />
                        </Form.Item>
                    </Col>
                    <Col span={9}>
                        <Typography.Text
                            strong
                            style={{ fontSize: '1.5rem' }}
                            className={'mb-4'}
                        >
                            User Info
                        </Typography.Text>
                        <Form.Item
                            label="First name"
                            name="firstName"
                            rules={[
                                {
                                    required: true,
                                    message: 'First name is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="First name"
                                value={currentSong?.firstName}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Last name"
                            name="lastName"
                            rules={[
                                {
                                    required: true,
                                    message: 'Last name is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Last name"
                                value={currentSong?.lastName}
                            />
                        </Form.Item>
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
                            <Select placeholder="Authorities">
                                <Select.Option value="ROLE_USER">
                                    ROLE_USER
                                </Select.Option>
                                <Select.Option value="ROLE_ADMIN">
                                    ROLE_ADMIN
                                </Select.Option>
                            </Select>
                        </Form.Item>
                        <Form.Item
                            label="Login"
                            name="login"
                            rules={[
                                {
                                    required: true,
                                    message: 'Actors is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Login name"
                                value={currentSong?.login}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Email is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Email"
                                value={currentSong?.email}
                            />
                        </Form.Item>
                        <Form.Item
                            label="Awards"
                            name="awards"
                            rules={[
                                {
                                    required: true,
                                    message: 'Awards is required'
                                }
                            ]}
                        >
                            <Input
                                placeholder="Awards"
                                value={currentSong?.awards}
                            />
                        </Form.Item>
                    </Col>
                </Row>
                <Flex justify={'end'}>
                    <Button
                        type="primary"
                        htmlType="submit"
                        onClick={() => form.submit()}
                        loading={updateLoading}
                    >
                        Update
                    </Button>
                </Flex>
            </Form>
            {updateLoading && <Spin spinning={updateLoading} />}
        </Modal>
    )
}

export default UpdateSongModal
