import { useDispatch, useSelector } from 'react-redux'
import {
    addBook,
    deleteBook,
    setBooks,
    setLoading,
    setNotLoading,
    updateBook
} from '../store/books/booksSlice'
import { useState } from 'react'

export const useBooksStore = () => {
    const dispatch = useDispatch()
    const { books, isLoading, error, counter } = useSelector((state) => state.books)
    const { user } = useSelector((state) => state.auth)
    const [orderBy, setOrderBy] = useState({
        field: 'inventory',
        order: 'asc'
    })

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

    const startUpdatingBook = async (book) => {
        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            const response = await window.booksApi.updateBook(book, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to update book')

            dispatch(updateBook({ book: response.book }))
            return true
        } catch (error) {
            console.error('Error updating book:', error)
            dispatch(setNotLoading({ error: 'Error al actualizar el libro' }))
            return false
        }
    }

    const startDeletingBook = async ({ id }) => {
        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            const response = await window.booksApi.deleteBook(id, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to delete book')

            dispatch(deleteBook({ id }))
            return true
        } catch (error) {
            console.error('Error deleting book:', error)
            dispatch(setNotLoading({ error: 'Error al eliminar el libro' }))
            return false
        }
    }

    const multipleAddBooks = async (books) => {
        const isBooksArray = checkIfIsBooksArray(books)

        if (!isBooksArray) return

        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            if (counter > 0) {
                const deleteResponse = await window.booksApi.deleteAllBooks(user.sessionToken)

                if (!deleteResponse.ok)
                    throw new Error(deleteResponse.msg || 'Failed to delete books')
            }

            const response = await window.booksApi.addMultipleBooks(books, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to add books')

            dispatch(setBooks({ books: response.books }))

            return true
        } catch (error) {
            console.error('Error adding books:', error)
            dispatch(setNotLoading({ error: 'Error al agregar los libros' }))
            return false
        }
    }

    const checkIfIsBooksArray = (books) => {
        if (!Array.isArray(books)) return false

        for (const book of books) {
            if (typeof book !== 'object') return false

            if (!book.inventory || !book.title || !book.author || !book.theme) return false
        }

        return true
    }

    const sortBy = (field) => {
        if (field !== 'inventory' && field !== 'title' && field !== 'author' && field !== 'theme')
            return

        setOrderBy({
            field,
            order: orderBy.field === field ? (orderBy.order === 'asc' ? 'desc' : 'asc') : 'asc'
        })

        const sortedBooks = [...books].sort((a, b) => {
            if (a[field] < b[field]) return orderBy.order === 'asc' ? -1 : 1
            if (a[field] > b[field]) return orderBy.order === 'asc' ? 1 : -1
            return 0
        })

        dispatch(setBooks({ books: sortedBooks }))
    }

    return {
        books,
        isLoading,
        error,
        counter,
        orderBy,

        startLoadingBooks,
        startAddingBook,
        startUpdatingBook,
        startDeletingBook,
        multipleAddBooks,
        sortBy
    }
}
