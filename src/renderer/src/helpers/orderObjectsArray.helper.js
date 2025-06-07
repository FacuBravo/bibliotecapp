import { getDateFromString } from './getDateFromString.helper'

export const orderObjectsArray = (array = [], field, order, isStringDate = false) => {
    if (!isStringDate) {
        return array.sort((a, b) => {
            if (a[field] > b[field]) return order === 'asc' ? 1 : -1
            if (a[field] < b[field]) return order === 'asc' ? -1 : 1
            return 0
        })
    }

    return array.sort((a, b) => {
        if (getDateFromString(a[field]) > getDateFromString(b[field]))
            return order === 'asc' ? 1 : -1
        if (getDateFromString(a[field]) < getDateFromString(b[field]))
            return order === 'asc' ? -1 : 1
        return 0
    })
}
