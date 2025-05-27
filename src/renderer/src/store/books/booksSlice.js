import { createSlice } from '@reduxjs/toolkit'

export const booksSlice = createSlice({
    name: 'books',
    initialState: {
        books: [],
        isLoading: true,
        error: null,
        counter: 0
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
        }
    }
})

export const { setBooks, setLoading, setNotLoading, addBook } = booksSlice.actions
