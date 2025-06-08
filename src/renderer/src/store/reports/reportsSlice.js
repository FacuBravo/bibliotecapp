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
        },
        setAuthorsWithMoreBooks: (state, { payload }) => {
            state.authorsWithMoreBooks = payload.authorsWithMoreBooks
        },
        setMostReaderSection: (state, { payload }) => {
            state.mostReaderSection = payload.mostReaderSection
        },
        setMostPopularThemes: (state, { payload }) => {
            state.mostPopularThemes = payload.mostPopularThemes
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
