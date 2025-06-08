import { createSlice } from '@reduxjs/toolkit'

export const reportsSlice = createSlice({
    name: 'reports',
    initialState: {
        isLoading: false,
        mostBorrowedBooks: [],
        authorsWithMoreBooks: [],
        mostReaderSection: [],
        mostPopularThemes: [],
        error: null
    },
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        setNotLoading: (state, { payload }) => {
            state.isLoading = false
            state.error = payload.error || null
        },
        setMostBorrowedBooks: (state, { payload }) => {
            state.mostBorrowedBooks = payload.mostBorrowedBooks
            state.isLoading = false
        },
        setAuthorsWithMoreBooks: (state, { payload }) => {
            state.authorsWithMoreBooks = payload.authorsWithMoreBooks
            state.isLoading = false
        },
        setMostReaderSection: (state, { payload }) => {
            state.mostReaderSection = payload.mostReaderSection
            state.isLoading = false
        },
        setMostPopularThemes: (state, { payload }) => {
            state.mostPopularThemes = payload.mostPopularThemes
            state.isLoading = false
        }
    }
})

export const {
    setMostBorrowedBooks,
    setAuthorsWithMoreBooks,
    setMostReaderSection,
    setMostPopularThemes,
    setLoading,
    setNotLoading
} = reportsSlice.actions
