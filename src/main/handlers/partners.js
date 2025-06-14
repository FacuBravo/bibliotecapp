import { v4 as uuidv4 } from 'uuid'

export const addPartner = (db, { name, surname, grade, section, type }) => {
    try {
        const partner = db
            .prepare(
                'INSERT INTO partner (id_card, name, surname, grade, section, type) VALUES (?, ?, ?, ?, ?, ?) RETURNING *'
            )
            .get(uuidv4(), name, surname, grade, section, type)

        return {
            ok: true,
            partner
        }
    } catch (error) {
        console.error('Error al agregar el usuario:', error)
        return {
            ok: false,
            msg: 'Error al agregar el usuario'
        }
    }
}

export const updatePartner = async (db, { id, name, surname, grade, section, type }) => {
    try {
        await db
            .prepare(
                'UPDATE partner SET name = ?, surname = ?, grade = ?, section = ?, type = ? WHERE id = ? RETURNING *'
            )
            .run(name, surname, grade, section, type, id)

        const res = getPartner(db, { id })

        if (!res.ok) throw new Error(res.msg)

        const partner = res.partner

        return {
            ok: true,
            partner
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al actualizar el usuario'
        }
    }
}

export const getPartners = (db) => {
    try {
        const partners = db
            .prepare(
                `SELECT p.*, 
                    (SELECT GROUP_CONCAT(l.date_end) 
                        FROM loan l 
                        WHERE l.partner_id = p.id_card AND l.returned = 0) as active_loans
                FROM partner p 
                ORDER BY p.id;`
            )
            .all()

        return {
            ok: true,
            partners
        }
    } catch (error) {
        console.error('Error al obtener los usuarios:', error)
        return {
            ok: false,
            msg: 'Error al obtener los usuarios'
        }
    }
}

export const getPartner = (db, { id }) => {
    try {
        const partner = db
            .prepare(
                `SELECT p.*, 
                    (SELECT GROUP_CONCAT(l.date_end) 
                        FROM loan l 
                        WHERE l.partner_id = p.id_card AND l.returned = 0) as active_loans
                FROM partner p 
                WHERE p.id = ?`
            )
            .get(id)

        return {
            ok: true,
            partner
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al obtener el usuario'
        }
    }
}

export const deletePartner = (db, { id }) => {
    try {
        const data = db.prepare('DELETE FROM partner WHERE id = ?').run(id)

        if (data.changes === 0) throw new Error()

        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al eliminar el usuario'
        }
    }
}

export const addMultiplePartners = (db, partners) => {
    try {
        const insert = db.prepare(
            'INSERT INTO partner (id_card, name, surname, grade, section, type) VALUES (?, ?, ?, ?, ?, ?) RETURNING *'
        )

        let partnersResponse = []

        for (const partner of partners) {
            partnersResponse.push(
                insert.get(
                    partner.id_card,
                    partner.name,
                    partner.surname,
                    partner.grade,
                    partner.section,
                    partner.type
                )
            )
        }

        return {
            ok: true,
            partners: partnersResponse
        }
    } catch (error) {
        console.error('Error al agregar usuarios:', error)
        return {
            ok: false,
            msg: 'Error al agregar usuarios'
        }
    }
}

export const deleteAllPartners = (db) => {
    try {
        const data = db.prepare('DELETE FROM partner').run()

        if (data.changes === 0) throw new Error()

        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al eliminar usuarios'
        }
    }
}
