export const mapper = (data) => {
    return data?.map((item) => {
        return {
            ...item,
            key: item.id,
            image: item?.image?.path,
            genresArr: item?.genres?.map((genre) => genre?.id)
        }
    })
}
