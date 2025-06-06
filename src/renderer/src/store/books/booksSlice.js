import { createSlice } from '@reduxjs/toolkit'

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        isLoading: true,
        error: null,
        counter: 0,
        orderBy: {
            field: 'inventory',
            order: 'asc'
        }
    },
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        setNotLoading: (state, { payload }) => {
            state.isLoading = false
            state.error = payload.error || null
        },
        setBooks: (state, { payload }) => {
            state.books = payload.books
            state.isLoading = false
            state.error = null
            state.counter = payload.books.length
        },
        addBook: (state, { payload }) => {
            state.books.push(payload.book)
            state.counter += 1
        },
        updateBook: (state, { payload }) => {
            state.books = state.books.map((book) =>
                book.id === payload.book.id ? payload.book : book
            )
            state.isLoading = false
        },
        updateBookState: (state, { payload }) => {
            state.books = state.books.map((book) => {
                if (book.id === payload.id) {
                    return {
                        ...book,
                        borrowed: payload.borrowed
                    }
                }
                return book
            })
            state.isLoading = false
        },
        deleteBook: (state, { payload }) => {
            state.books = state.books.filter((book) => book.id !== payload.id)
            state.counter -= 1
        },
        setOrderBy: (state, { payload }) => {
            state.orderBy.field = payload.field
            state.orderBy.order = payload.order
        }
    }
})

export const {
    setBooks,
    setLoading,
    setNotLoading,
    addBook,
    updateBook,
    updateBookState,
    deleteBook,
    setOrderBy
} = booksSlice.actions
