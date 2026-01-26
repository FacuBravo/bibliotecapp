import { join } from 'path'
import { homedir } from 'os'
import { existsSync, mkdirSync } from 'fs'
import { open } from 'sqlite'
import sqlite3 from 'sqlite3'

export const createDb = async () => {
    const dbDir = join(homedir(), '.bibliotecapp')
    if (!existsSync(dbDir)) {
        mkdirSync(dbDir, { recursive: true })
    }

    const dbPath = join(dbDir, 'mydb.db')

    const db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })

    await db.exec('PRAGMA foreign_keys = ON')

    return db
}
