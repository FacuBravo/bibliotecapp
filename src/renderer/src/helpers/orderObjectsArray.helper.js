export const orderObjectsArray = (array = [], field, order) => {
    return array.sort((a, b) => {
        if (a[field] > b[field]) return order === 'asc' ? 1 : -1
        if (a[field] < b[field]) return order === 'asc' ? -1 : 1
        return 0
    })
}
