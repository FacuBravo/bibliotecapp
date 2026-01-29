export const isISO = (dateStr) => {
    if (typeof dateStr !== 'string') return false

    const isoRegex =
        /^\d{4}-\d{2}-\d{2}(?:[T\s]\d{2}:\d{2}(?::\d{2}(?:\.\d{1,3})?)?(?:Z|[+-]\d{2}:\d{2})?)?$/

    if (!isoRegex.test(dateStr)) return false

    const date = new Date(dateStr)
    return !isNaN(date.getTime())
}

export const dateStringToISO = (dateStr) => {
    if (typeof dateStr !== 'string') return ''

    const [day, month, year] = dateStr.split('/')
    return `${year}-${month}-${day}`
}
