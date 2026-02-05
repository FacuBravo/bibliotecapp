import { dateStringToISO, isISO } from '../helpers'

export const addLoan = async (db, { date_start, date_end, book_id, partner_id }) => {
    try {
        const formatedDateStart = isISO(date_start) ? date_start : dateStringToISO(date_start)
        const formatedDateEnd = isISO(date_end) ? date_end : dateStringToISO(date_end)

        await db.run(
            'INSERT INTO loan (date_start, date_end, returned, book_id, partner_id) VALUES (?, ?, 0, ?, ?)',
            [formatedDateStart, formatedDateEnd, book_id, partner_id]
        )

        const loan = await db.get(
            'SELECT * FROM loan WHERE book_id = ? AND partner_id = ? ORDER BY id DESC LIMIT 1',
            [book_id, partner_id]
        )

        return { ok: true, loan }
    } catch (error) {
        console.error('Error al hacer el préstamo:', error)
        return { ok: false, msg: 'Error al hacer el préstamo' }
    }
}

export const setLoanState = async (db, { id, returned }) => {
    try {
        const result = await db.run('UPDATE loan SET returned = ? WHERE id = ?', [returned, id])

        if (result.changes === 0) throw new Error()

        return { ok: true }
    } catch (error) {
        return { ok: false, msg: 'Error al actualizar el préstamo' }
    }
}

export const updateLoan = async (db, { id, date_end }) => {
    try {
        await db.run('UPDATE loan SET date_end = ? WHERE id = ?', [date_end, id])

        const loan = await db.get('SELECT * FROM loan WHERE id = ?', [id])

        return { ok: true, loan }
    } catch (error) {
        return { ok: false, msg: 'Error al actualizar el préstamo' }
    }
}

export const getLoans = async (db, { offset, limit, search, orderBy, order }) => {
    try {
        let query = `SELECT l.id, l.date_start, l.date_end, l.book_id, l.partner_id, l.returned, p.name, p.surname, p.id as auto_partner_id, b.id as auto_book_id, b.title, b.borrowed FROM loan l JOIN partner p ON l.partner_id = p.id_card JOIN book b ON b.inventory = l.book_id ORDER BY l.${orderBy} ${order}`

        let loans = await db.all(query)

        if (search) {
            loans = loans.filter((loan) => {
                return (
                    loan.book_id.toString().toLowerCase().includes(search.toLowerCase()) ||
                    loan.auto_partner_id.toString().toLowerCase().includes(search.toLowerCase()) ||
                    loan.title.toLowerCase().includes(search.toLowerCase()) ||
                    loan.name.toLowerCase().includes(search.toLowerCase()) ||
                    loan.surname.toLowerCase().includes(search.toLowerCase()) ||
                    loan.date_start.toLowerCase().includes(search.toLowerCase()) ||
                    loan.date_end.toLowerCase().includes(search.toLowerCase())
                )
            })
        }

        const total = loans.length
        const page = Math.floor(offset / limit)

        loans = loans.slice(offset, offset + limit)

        return {
            ok: true,
            loans,
            page,
            total,
            isLast: offset + limit >= total
        }
    } catch (error) {
        return { ok: false, msg: 'Error al obtener los préstamos' }
    }
}

export const getLoan = async (db, { id }) => {
    try {
        const loan = await db.get('SELECT * FROM loan WHERE id = ?', [id])

        return { ok: true, loan }
    } catch (error) {
        return { ok: false, msg: 'Error al obtener el préstamo' }
    }
}

export const deleteLoan = async (db, { id }) => {
    try {
        const result = await db.run('DELETE FROM loan WHERE id = ?', [id])
        if (result.changes === 0) throw new Error()

        return { ok: true }
    } catch (error) {
        return { ok: false, msg: 'Error al eliminar el préstamo' }
    }
}

export const addMultipleLoans = async (db, loans) => {
    try {
        for (const loan of loans) {
            let date_start = loan.date_start
            let date_end = loan.date_end

            if (!isISO(date_start)) {
                date_start = dateStringToISO(date_start)
            }

            if (!isISO(date_end)) {
                date_end = dateStringToISO(date_end)
            }

            await db.run(
                'INSERT INTO loan (date_start, date_end, returned, book_id, partner_id) VALUES (?, ?, ?, ?, ?)',
                [date_start, date_end, loan.returned, loan.book_id, loan.partner_id]
            )
        }

        return { ok: true }
    } catch (error) {
        console.error('Error al agregar préstamos:', error)
        return { ok: false, msg: 'Error al agregar préstamos' }
    }
}

export const deleteAllLoans = async (db) => {
    try {
        await db.run(`UPDATE sqlite_sequence SET seq = 0 WHERE name = 'loan';`)
        const result = await db.run('DELETE FROM loan')
        if (result.changes === 0) throw new Error()

        return { ok: true }
    } catch (error) {
        return { ok: false, msg: 'Error al eliminar préstamos' }
    }
}

export const countActiveLoans = async (db) => {
    try {
        const row = await db.get(`SELECT COUNT(*) as total FROM loan WHERE returned = 0`)
        const total = row.total

        return { ok: true, total }
    } catch (error) {
        return { ok: false, msg: 'Error al contar los préstamos activos' }
    }
}
