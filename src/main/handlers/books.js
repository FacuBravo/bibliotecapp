export const addBook = async (
    db,
    { inventory, title, author, edition, place, editorial, year, theme, collection }
) => {
    try {
        await db.run(
            'INSERT INTO book (inventory, title, author, edition, place, editorial, year, theme, borrowed, collection) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?)',
            [inventory, title, author, edition, place, editorial, year, theme, collection]
        )

        const book = await db.get('SELECT * FROM book WHERE inventory = ?', [inventory])

        return { ok: true, book }
    } catch (error) {
        console.error('Error al agregar el libro:', error)
        return { ok: false, msg: 'Error al agregar el libro' }
    }
}

export const setBookState = async (db, { id, borrowed }) => {
    try {
        const result = await db.run('UPDATE book SET borrowed = ? WHERE id = ?', [borrowed, id])
        if (result.changes === 0) throw new Error()

        return { ok: true }
    } catch (error) {
        return { ok: false, msg: 'Error al actualizar el libro' }
    }
}

export const updateBook = async (
    db,
    { id, inventory, title, author, edition, place, editorial, year, theme, collection }
) => {
    try {
        await db.run(
            'UPDATE book SET inventory = ?, title = ?, author = ?, edition = ?, place = ?, editorial = ?, year = ?, theme = ?, collection = ? WHERE id = ?',
            [inventory, title, author, edition, place, editorial, year, theme, collection, id]
        )

        const book = await db.get('SELECT * FROM book WHERE id = ?', [id])

        return { ok: true, book }
    } catch (error) {
        return { ok: false, msg: 'Error al actualizar el libro' }
    }
}

export const getBooks = async (db) => {
    try {
        const books = await db.all('SELECT * FROM book ORDER BY inventory')
        return { ok: true, books }
    } catch (error) {
        return { ok: false, msg: 'Error al obtener los libros' }
    }
}

export const getBook = async (db, { id }) => {
    try {
        const book = await db.get('SELECT * FROM book WHERE id = ?', [id])
        return { ok: true, book }
    } catch (error) {
        return { ok: false, msg: 'Error al obtener el libro' }
    }
}

export const deleteBook = async (db, { id }) => {
    try {
        const result = await db.run('DELETE FROM book WHERE id = ?', [id])
        if (result.changes === 0) throw new Error()

        return { ok: true }
    } catch (error) {
        return { ok: false, msg: 'Error al eliminar el libro' }
    }
}

export const addMultipleBooks = async (db, books) => {
    try {
        const stmt = await db.prepare(
            'INSERT INTO book (inventory, title, author, edition, place, editorial, year, theme, borrowed, collection) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)'
        )

        const booksResponse = []

        for (const book of books) {
            await stmt.run(
                book.inventory,
                book.title,
                book.author,
                book.edition,
                book.place,
                book.editorial,
                book.year,
                book.theme,
                book.borrowed,
                book.collection
            )

            const inserted = await db.get('SELECT * FROM book WHERE inventory = ?', [
                book.inventory
            ])
            booksResponse.push(inserted)
        }

        await stmt.finalize()

        return { ok: true, books: booksResponse }
    } catch (error) {
        console.error('Error al agregar libros:', error)
        return { ok: false, msg: 'Error al agregar libros' }
    }
}

export const deleteAllBooks = async (db) => {
    try {
        const result = await db.run('DELETE FROM book')
        if (result.changes === 0) throw new Error()

        return { ok: true }
    } catch (error) {
        return { ok: false, msg: 'Error al eliminar libros' }
    }
}
