import bcrypt from 'bcryptjs'
import { getRandomToken } from '../../helpers'
let session = null

export const register = async (db, username, password) => {
    const hash = bcrypt.hashSync(password, 10)

    try {
        const result = await db.run(
            `INSERT INTO users (username, password) VALUES (?, ?)`,
            username,
            hash
        )

        if (result.changes !== 1) throw new Error()

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

export const login = async (db, username, password) => {
    try {
        const user = await db.get(`SELECT * FROM users WHERE username = ?`, username)

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
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al intentar iniciar sesión'
        }
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
