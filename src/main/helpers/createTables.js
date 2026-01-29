import { isISO } from './dateStringIso'

export const createTables = async (db) => {
    await db.run(
        `CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        username VARCHAR(20) UNIQUE, 
        password TEXT)`
    )

    await db.run(
        `CREATE TABLE IF NOT EXISTS partner (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        id_card TEXT UNIQUE,
        name VARCHAR(100), 
        surname VARCHAR(100), 
        grade VARCHAR(20), 
        section VARCHAR(10), 
        type VARCHAR(20))`
    )

    await db.run(
        `CREATE TABLE IF NOT EXISTS book (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        inventory INTEGER UNIQUE,
        title VARCHAR(150), 
        author VARCHAR(400), 
        edition VARCHAR(100), 
        place VARCHAR(100), 
        editorial VARCHAR(100), 
        year INTEGER,
        borrowed INTEGER,
        theme VARCHAR(100),
        collection VARCHAR(80))`
    )

    await db.run(
        `CREATE TABLE IF NOT EXISTS loan (
        id INTEGER PRIMARY KEY AUTOINCREMENT, 
        date_start VARCHAR(10), 
        date_end VARCHAR(10), 
        returned INTEGER,
        book_id INTEGER, 
        partner_id TEXT,
        FOREIGN KEY (book_id) REFERENCES book (inventory) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE,
        FOREIGN KEY (partner_id) REFERENCES partner (id_card) 
          ON DELETE CASCADE 
          ON UPDATE CASCADE)`
    )

    try {
        const loan = await db.get(`SELECT date_start, date_end FROM loan LIMIT 1`)

        if (loan) {
            if (!isISO(loan.date_start) || !isISO(loan.date_end)) {
                await db.exec('BEGIN TRANSACTION')

                await db.exec(
                    `UPDATE loan SET 
                    date_start = substr(date_start, 7, 4) || '-' ||
                    substr(date_start, 4, 2) || '-' ||
                    substr(date_start, 1, 2),
                    date_end = substr(date_end, 7, 4) || '-' ||
                    substr(date_end, 4, 2) || '-' ||
                    substr(date_end, 1, 2);`
                )

                await db.exec('COMMIT')

                await db.exec(
                    `CREATE INDEX IF NOT EXISTS idx_loan_date_start ON loan(date_start);
                    CREATE INDEX IF NOT EXISTS idx_loan_date_end   ON loan(date_end);`
                )
            }
        }
    } catch (error) {
        await db.exec('ROLLBACK')
        console.log(error)
    }
}
