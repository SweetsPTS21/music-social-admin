export const mapper = (data) => {
    return data.map((item) => {
        return {
            ...item,
            key: item.id,
            thumbnail: item?.thumbnail?.path,
            artistIds: [item?.artist?.id]
        }
    })
}
