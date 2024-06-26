import dayjs from 'dayjs'

export const mapper = (data) => {
    if (!data) return []

    return data.map((item) => {
        const audio = item?.audio || {}
        const thumbnail = item?.thumbnail?.path || ''
        const createDate = dayjs(item?.createDate).format('DD/MM/YYYY hh:mm:ss')

        return {
            ...item,
            key: item?.id,
            audio,
            thumbnail,
            createDate,
            authorities: item?.userDTO?.authorities,
            firstName: item?.userDTO?.firstName,
            lastName: item?.userDTO?.lastName,
            email: item?.userDTO?.email,
            login: item?.userDTO?.login,
            activated: item?.userDTO?.activated,
            genresArr: item?.genres?.map((gen) => gen?.id),
            tagsArr: item?.tags?.map((tag) => tag?.id)
        }
    })
}
