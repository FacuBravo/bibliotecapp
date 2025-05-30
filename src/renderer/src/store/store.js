import { configureStore } from '@reduxjs/toolkit'
import { authSlice, uiSlice, booksSlice, partnersSlice } from './'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        books: booksSlice.reducer,
        partners: partnersSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})
