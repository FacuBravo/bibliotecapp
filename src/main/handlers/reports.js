export const getAuthorsWithMoreBooks = async (db) => {
    try {
        const authors = await db.all(`
      SELECT b.author, COUNT(*) n_books
      FROM book b
      GROUP BY b.author
      ORDER BY n_books DESC
      LIMIT 3
    `)

        return {
            ok: true,
            authors
        }
    } catch (error) {
        console.error('Error al obtener los autores:', error)
        return {
            ok: false,
            msg: 'Error al obtener los autores'
        }
    }
}

export const getMostBorrowedBooks = async (db) => {
    try {
        const books = await db.all(`
      SELECT b.inventory, b.title, b.author, COUNT(l.id) n_borrowed
      FROM book b
      JOIN loan l ON l.book_id = b.inventory
      GROUP BY b.inventory
      ORDER BY n_borrowed DESC
      LIMIT 3
    `)

        return {
            ok: true,
            books
        }
    } catch (error) {
        console.error('Error al obtener los libros:', error)
        return {
            ok: false,
            msg: 'Error al obtener los libros'
        }
    }
}

export const getMostPopularThemes = async (db) => {
    try {
        const themes = await db.all(`
      SELECT b.theme, COUNT(l.id) n_borrowed
      FROM book b
      JOIN loan l ON l.book_id = b.inventory
      GROUP BY b.theme
      ORDER BY n_borrowed DESC
      LIMIT 3
    `)

        return {
            ok: true,
            themes
        }
    } catch (error) {
        console.error('Error al obtener los temas:', error)
        return {
            ok: false,
            msg: 'Error al obtener los temas'
        }
    }
}

export const getMostReaderSection = async (db) => {
    try {
        const sections = await db.all(`
      SELECT p.grade, p.section, COUNT(l.id) n_borrowed
      FROM partner p
      JOIN loan l ON l.partner_id = p.id_card
      GROUP BY p.grade, p.section
      ORDER BY n_borrowed DESC
      LIMIT 3
    `)

        return {
            ok: true,
            sections
        }
    } catch (error) {
        console.error('Error al obtener las secciones:', error)
        return {
            ok: false,
            msg: 'Error al obtener las secciones'
        }
    }
}
