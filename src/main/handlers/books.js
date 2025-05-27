export const addBook = (
    db,
    { inventory, title, author, edition, place, editorial, year, theme, collection }
) => {
    try {
        const book = db
            .prepare(
                'INSERT INTO book (inventory, title, author, edition, place, editorial, year, theme, borrowed, collection) VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, ?) RETURNING *'
            )
            .get(inventory, title, author, edition, place, editorial, year, theme, collection)

        return {
            ok: true,
            book
        }
    } catch (error) {
        console.error('Error al agregar el libro:', error)
        return {
            ok: false,
            msg: 'Error al agregar el libro'
        }
    }
}

export const setBookState = (db, { id, borrowed }) => {
    try {
        const data = db.prepare('UPDATE book SET borrowed = ? WHERE id = ?').run(borrowed, id)

        if (data.changes === 0) throw new Error()

        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al actualizar el libro'
        }
    }
}

export const updateBook = (
    db,
    { id, inventory, title, author, edition, place, editorial, year, theme, collection }
) => {
    try {
        const data = db
            .prepare(
                'UPDATE book SET inventory = ?, title = ?, author = ?, edition = ?, place = ?, editorial = ?, year = ?, theme = ?, collection = ? WHERE id = ?'
            )
            .run(inventory, title, author, edition, place, editorial, year, theme, collection, id)

        if (data.changes === 0) throw new Error()

        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al actualizar el libro'
        }
    }
}

export const getBooks = (db) => {
    try {
        const books = db.prepare('SELECT * FROM book').all()

        return {
            ok: true,
            books
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al obtener los libros'
        }
    }
}

export const getBook = (db, { id }) => {
    try {
        const book = db.prepare('SELECT * FROM book WHERE id = ?').get(id)

        return {
            ok: true,
            book
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al obtener el libro'
        }
    }
}

export const deleteBook = (db, { id }) => {
    try {
        const data = db.prepare('DELETE FROM book WHERE id = ?').run(id)

        if (data.changes === 0) throw new Error()

        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al eliminar el libro'
        }
    }
}
