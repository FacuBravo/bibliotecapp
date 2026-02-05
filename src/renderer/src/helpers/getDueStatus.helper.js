import { formatDistanceToNowStrict, isAfter, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const getDueStatus = (dateEnd) => {
    const end = parseISO(dateEnd)
    const now = new Date()

    const distance = formatDistanceToNowStrict(end, {
        locale: es
    })
        .replace('horas', 'hs')
        .replace('hora', 'h')
        .replace('minutos', 'min')
        .replace('minuto', 'min')
        .replace('días', 'd')
        .replace('día', 'd')

    if (isAfter(end, now)) {
        return `Vence en ${distance}`
    }

    return `Vencido hace ${distance}`
}
