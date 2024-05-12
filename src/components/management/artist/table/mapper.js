export const mapper = (data) => {
    return data.map((item) => {
        return {
            ...item,
            key: item.id,
            image: item?.image?.path
        }
    })
}
