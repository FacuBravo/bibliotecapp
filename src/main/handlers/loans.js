export const addLoan = (db, { date_start, date_end, book_id, partner_id }) => {
    try {
        const loan = db
            .prepare(
                'INSERT INTO loan (date_start, date_end, returned, book_id, partner_id) VALUES (?, ?, 0, ?, ?) RETURNING *'
            )
            .get(date_start, date_end, book_id, partner_id)

        return {
            ok: true,
            loan
        }
    } catch (error) {
        console.error('Error al hacer el prestamo:', error)
        return {
            ok: false,
            msg: 'Error al hacer el prestamo'
        }
    }
}

export const setLoanState = (db, { id, returned }) => {
    try {
        const data = db.prepare('UPDATE loan SET returned = ? WHERE id = ?').run(returned, id)

        if (data.changes === 0) throw new Error()

        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al actualizar el prestamo'
        }
    }
}

export const updateLoan = (db, { id, date_end }) => {
    try {
        const loan = db
            .prepare('UPDATE loan SET date_end = ? WHERE id = ? RETURNING *')
            .get(date_end, id)

        return {
            ok: true,
            loan
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al actualizar el prestamo'
        }
    }
}

export const getLoans = (db) => {
    try {
        const loans = db
            .prepare(
                'SELECT l.id, l.date_start, l.date_end, l.book_id, l.partner_id, l.returned, p.name, p.surname, p.id as auto_partner_id, b.id as auto_book_id, b.title, b.borrowed FROM loan l JOIN partner p ON l.partner_id = p.id_card JOIN book b ON b.inventory = l.book_id ORDER BY l.date_start DESC'
            )
            .all()

        return {
            ok: true,
            loans
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al obtener los prestamos'
        }
    }
}

export const getLoan = (db, { id }) => {
    try {
        const loan = db.prepare('SELECT * FROM loan WHERE id = ?').get(id)

        return {
            ok: true,
            loan
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al obtener el prestamo'
        }
    }
}

export const addMultipleLoans = (db, loans) => {
    try {
        const insert = db.prepare(
            'INSERT INTO loan (date_start, date_end, returned, book_id, partner_id) VALUES (?, ?, ?, ?, ?) RETURNING *'
        )

        for (const loan of loans) {
            insert.run(loan.date_start, loan.date_end, loan.returned, loan.book_id, loan.partner_id)
        }

        return {
            ok: true,
            loans: getLoans(db).loans
        }
    } catch (error) {
        console.error('Error al agregar prestamos:', error)
        return {
            ok: false,
            msg: 'Error al agregar prestamos'
        }
    }
}

export const deleteAllLoans = (db) => {
    try {
        const data = db.prepare('DELETE FROM loan').run()

        if (data.changes === 0) throw new Error()

        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al eliminar prestamos'
        }
    }
}
