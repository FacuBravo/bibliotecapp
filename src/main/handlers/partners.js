import { v4 as uuidv4 } from 'uuid'

export const addPartner = async (db, { name, surname, grade, section, type }) => {
    try {
        const id_card = uuidv4()
        await db.run(
            'INSERT INTO partner (id_card, name, surname, grade, section, type) VALUES (?, ?, ?, ?, ?, ?)',
            [id_card, name, surname, grade, section, type]
        )

        const partner = await db.get('SELECT * FROM partner WHERE id_card = ?', [id_card])

        return { ok: true, partner }
    } catch (error) {
        console.error('Error al agregar el usuario:', error)
        return { ok: false, msg: 'Error al agregar el usuario' }
    }
}

export const updatePartner = async (db, { id, name, surname, grade, section, type }) => {
    try {
        await db.run(
            'UPDATE partner SET name = ?, surname = ?, grade = ?, section = ?, type = ? WHERE id = ?',
            [name, surname, grade, section, type, id]
        )

        const partner = await db.get('SELECT * FROM partner WHERE id = ?', [id])

        return { ok: true, partner }
    } catch (error) {
        return { ok: false, msg: 'Error al actualizar el usuario' }
    }
}

export const getPartners = async (db) => {
    try {
        const partners = await db.all(`
            SELECT p.*, 
                (SELECT GROUP_CONCAT(l.date_end) 
                 FROM loan l 
                 WHERE l.partner_id = p.id_card AND l.returned = 0) as active_loans
            FROM partner p 
            ORDER BY p.id
        `)

        return { ok: true, partners }
    } catch (error) {
        console.error('Error al obtener los usuarios:', error)
        return { ok: false, msg: 'Error al obtener los usuarios' }
    }
}

export const getPartner = async (db, { id }) => {
    try {
        const partner = await db.get(
            `
            SELECT p.*, 
                (SELECT GROUP_CONCAT(l.date_end) 
                 FROM loan l 
                 WHERE l.partner_id = p.id_card AND l.returned = 0) as active_loans
            FROM partner p 
            WHERE p.id = ?
        `,
            [id]
        )

        return { ok: true, partner }
    } catch (error) {
        return { ok: false, msg: 'Error al obtener el usuario' }
    }
}

export const deletePartner = async (db, { id }) => {
    try {
        const result = await db.run('DELETE FROM partner WHERE id = ?', [id])
        if (result.changes === 0) throw new Error()

        return { ok: true }
    } catch (error) {
        return { ok: false, msg: 'Error al eliminar el usuario' }
    }
}

export const addMultiplePartners = async (db, partners) => {
    try {
        const partnersResponse = []

        for (const partner of partners) {
            const id_card = partner.id_card || uuidv4()
            await db.run(
                'INSERT INTO partner (id_card, name, surname, grade, section, type) VALUES (?, ?, ?, ?, ?, ?)',
                [
                    id_card,
                    partner.name,
                    partner.surname,
                    partner.grade,
                    partner.section,
                    partner.type
                ]
            )

            const inserted = await db.get('SELECT * FROM partner WHERE id_card = ?', [id_card])
            partnersResponse.push(inserted)
        }

        return { ok: true, partners: partnersResponse }
    } catch (error) {
        console.error('Error al agregar usuarios:', error)
        return { ok: false, msg: 'Error al agregar usuarios' }
    }
}

export const deleteAllPartners = async (db) => {
    try {
        const result = await db.run('DELETE FROM partner')
        if (result.changes === 0) throw new Error()

        return { ok: true }
    } catch (error) {
        return { ok: false, msg: 'Error al eliminar usuarios' }
    }
}
