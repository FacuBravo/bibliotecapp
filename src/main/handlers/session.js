import bcrypt from 'bcrypt'
import { getRandomToken } from '../../helpers/getRandomToken'

export const register = (db, username, password) => {
    const hash = bcrypt.hashSync(password, 10)

    try {
        const data = db
            .prepare(`INSERT INTO users (username, password) VALUES (?, ?) RETURNING *`)
            .run(username, hash)

        if (data.changes !== 1) throw new Error()

        return {
            ok: true,
            sessionToken: getRandomToken()
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'El usuario ya existe'
        }
    }
}

export const login = (db, username, password) => {
    const user = db.prepare(`SELECT * FROM users WHERE username = ?`).get(username)

    if (!user) return { ok: false, msg: 'Credenciales incorrectas' }

    const validPassword = bcrypt.compareSync(password, user.password)

    if (!validPassword) return { ok: false, msg: 'Credenciales incorrectas' }

    return {
        ok: true,
        sessionToken: getRandomToken()
    }
}

export const checkSessionToken = (session, sessionToken) => {
    if (session === null) return { ok: false, username: null }

    return {
        ok: session.token === sessionToken,
        username: session.token === sessionToken ? session.username : null
    }
}

export const logout = (session) => {
    session = null
}
