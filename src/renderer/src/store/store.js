import { configureStore } from '@reduxjs/toolkit'
import { authSlice, uiSlice, booksSlice, partnersSlice, loansSlice, reportsSlice } from './'

export const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
        books: booksSlice.reducer,
        partners: partnersSlice.reducer,
        loans: loansSlice.reducer,
        reports: reportsSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false
        })
})
