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
        const book = db
            .prepare(
                'UPDATE book SET inventory = ?, title = ?, author = ?, edition = ?, place = ?, editorial = ?, year = ?, theme = ?, collection = ? WHERE id = ? RETURNING *'
            )
            .get(inventory, title, author, edition, place, editorial, year, theme, collection, id)

        return {
            ok: true,
            book
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
        const books = db.prepare('SELECT * FROM book ORDER BY inventory').all()

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

export const addMultipleBooks = (db, books) => {
    try {
        const insert = db.prepare(
            'INSERT INTO book (inventory, title, author, edition, place, editorial, year, theme, borrowed, collection) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?) RETURNING *'
        )

        let booksResponse = []

        for (const book of books) {
            booksResponse.push(
                insert.get(
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
            )
        }

        return {
            ok: true,
            books: booksResponse
        }
    } catch (error) {
        console.error('Error al agregar libros:', error)
        return {
            ok: false,
            msg: 'Error al agregar libros'
        }
    }
}

export const deleteAllBooks = (db) => {
    try {
        const data = db.prepare('DELETE FROM book').run()

        if (data.changes === 0) throw new Error()

        return {
            ok: true
        }
    } catch (error) {
        return {
            ok: false,
            msg: 'Error al eliminar libros'
        }
    }
}
