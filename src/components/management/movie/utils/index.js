export const getMovieTagColor = (tag) => {
    switch (tag) {
        case 'Action':
            return '#f50'
        case 'Adventure':
            return '#2db7f5'
        case 'Comedy':
            return '#87d068'
        case 'Drama':
            return '#108ee9'
        case 'Fantasy':
            return '#3b5999'
        case 'Horror':
            return '#cd201f'
        case 'Mystery':
            return '#faad14'
        case 'Thriller':
            return '#c41d7f'
        case 'Crime':
            return '#722ed1'
        case 'Animation':
            return '#52c41a'
        case 'Family':
            return '#eb2f96'
        case 'Romance':
            return '#722ed1'
        case 'Sci-Fi':
            return '#2db7f5'
        case 'Biography':
            return '#fa541c'
        case 'History':
            return '#3b5999'
        default:
            return '#531dab'
    }
}

export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = () => resolve(reader.result)
        reader.onerror = (error) => reject(error)
    })
