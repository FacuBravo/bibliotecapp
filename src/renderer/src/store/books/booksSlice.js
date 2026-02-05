import { createSlice } from '@reduxjs/toolkit'

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        page: 0,
        isLast: false,
        isLoading: true,
        error: null,
        counter: 0,
        orderBy: {
            field: 'inventory',
            order: 'asc'
        },
        total: 0
    },
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        setNotLoading: (state, { payload }) => {
            state.isLoading = false
            state.error = payload?.error || null
        },
        setBooks: (state, { payload }) => {
            state.books = payload.books
            state.page = payload.page
            state.isLast = payload.isLast
            state.isLoading = false
            state.error = null
            state.counter = payload.total
        },
        setBooksCount: (state, { payload }) => {
            state.total = payload.total
        },
        addBook: (state) => {
            state.total += 1
        },
        deleteBook: (state) => {
            state.total -= 1
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
    setBooksCount,
    addBook,
    deleteBook,
    setOrderBy
} = booksSlice.actions
