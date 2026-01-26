export const createTables = async (db) => {
    await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      username VARCHAR(20) UNIQUE, 
      password TEXT
    )
  `)

    await db.run(`
    CREATE TABLE IF NOT EXISTS partner (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      id_card TEXT UNIQUE,
      name VARCHAR(100), 
      surname VARCHAR(100), 
      grade VARCHAR(20), 
      section VARCHAR(10), 
      type VARCHAR(20)
    )
  `)

    await db.run(`
    CREATE TABLE IF NOT EXISTS book (
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
      collection VARCHAR(80)
    )
  `)

    await db.run(`
    CREATE TABLE IF NOT EXISTS loan (
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
        ON UPDATE CASCADE
    )
  `)
}
