import bcrypt from "bcryptjs";
import { getRandomToken } from '../../helpers'
let session = null

export const register = (db, username, password) => {
    const hash = bcrypt.hashSync(password, 10)

    try {
        const data = db
            .prepare(`INSERT INTO users (username, password) VALUES (?, ?)`)
            .run(username, hash)

        if (data.changes !== 1) throw new Error()

        session = {
            username,
            token: getRandomToken()
        }

        return {
            ok: true,
            sessionToken: session.token
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

    session = {
        username,
        token: getRandomToken()
    }

    return {
        ok: true,
        sessionToken: session.token
    }
}

export const checkSessionToken = (sessionToken) => {
    if (session === null) return { ok: false, username: null }

    return {
        ok: session.token === sessionToken,
        username: session.token === sessionToken ? session.username : null
    }
}

export const logout = () => {
    session = null
}
