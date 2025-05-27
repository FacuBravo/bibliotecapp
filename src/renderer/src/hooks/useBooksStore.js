import { useDispatch, useSelector } from 'react-redux'
import { addBook, setBooks, setLoading, setNotLoading } from '../store/books/booksSlice'

export const useBooksStore = () => {
    const dispatch = useDispatch()
    const { books, isLoading, error, counter } = useSelector((state) => state.books)
    const { user } = useSelector((state) => state.auth)

    const startLoadingBooks = async () => {
        dispatch(setLoading())

        try {
            const response = await window.booksApi.getBooks()

            if (!response.ok) throw new Error('Failed to fetch books')

            dispatch(setBooks({ books: response.books }))
        } catch (error) {
            console.error('Error loading books:', error)
            dispatch(setNotLoading({ error: 'Error al obtener los libros' }))
        }
    }

    const startAddingBook = async (book) => {
        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            const response = await window.booksApi.addBook(book, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to add book')

            dispatch(addBook({ book: response.book }))
            return true
        } catch (error) {
            console.error('Error adding book:', error)
            dispatch(setNotLoading({ error: 'Error al agregar el libro' }))
            return false
        }
    }

    return {
        books,
        isLoading,
        error,
        counter,
        startLoadingBooks,
        startAddingBook
    }
}
