export const addLoan = async (db, { date_start, date_end, book_id, partner_id }) => {
    try {
        await db.run(
            'INSERT INTO loan (date_start, date_end, returned, book_id, partner_id) VALUES (?, ?, 0, ?, ?)',
            [date_start, date_end, book_id, partner_id]
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

export const getLoans = async (db) => {
    try {
        const loans = await db.all(`
            SELECT l.id, l.date_start, l.date_end, l.book_id, l.partner_id, l.returned,
                   p.name, p.surname, p.id as auto_partner_id,
                   b.id as auto_book_id, b.title, b.borrowed
            FROM loan l
            JOIN partner p ON l.partner_id = p.id_card
            JOIN book b ON b.inventory = l.book_id
            ORDER BY l.date_start DESC
        `)

        return { ok: true, loans }
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
            await db.run(
                'INSERT INTO loan (date_start, date_end, returned, book_id, partner_id) VALUES (?, ?, ?, ?, ?)',
                [loan.date_start, loan.date_end, loan.returned, loan.book_id, loan.partner_id]
            )
        }

        const allLoans = await db.all(`
            SELECT l.id, l.date_start, l.date_end, l.book_id, l.partner_id, l.returned,
                   p.name, p.surname, p.id as auto_partner_id,
                   b.id as auto_book_id, b.title, b.borrowed
            FROM loan l
            JOIN partner p ON l.partner_id = p.id_card
            JOIN book b ON b.inventory = l.book_id
            ORDER BY l.date_start DESC
        `)

        return { ok: true, loans: allLoans }
    } catch (error) {
        console.error('Error al agregar préstamos:', error)
        return { ok: false, msg: 'Error al agregar préstamos' }
    }
}

export const deleteAllLoans = async (db) => {
    try {
        const result = await db.run('DELETE FROM loan')
        if (result.changes === 0) throw new Error()

        return { ok: true }
    } catch (error) {
        return { ok: false, msg: 'Error al eliminar préstamos' }
    }
}
