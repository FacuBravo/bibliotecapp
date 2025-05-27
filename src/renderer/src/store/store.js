import { configureStore } from '@reduxjs/toolkit'
import { authSlice, uiSlice, booksSlice } from './'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        books: booksSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})
