import { createSlice } from '@reduxjs/toolkit'

export const loansSlice = createSlice({
    name: 'loans',
    initialState: {
        loans: [],
        page: 0,
        isLast: false,
        counter: 0,
        isLoading: true,
        partner: null,
        book: null,
        error: null,
        activeLoansCounter: 0,
        orderBy: {
            field: 'date_start',
            order: 'desc'
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
        setLoans: (state, { payload }) => {
            state.loans = payload.loans
            state.page = payload.page
            state.isLast = payload.isLast
            state.counter = payload.total
            state.activeLoansCounter = payload.activeLoansCounter
            state.isLoading = false
            state.error = null
        },
        addLoan: (state) => {
            state.activeLoansCounter++
        },
        deleteLoan: (state, { payload }) => {
            state.isLoading = false

            if (payload.loan.returned === 0) {
                state.activeLoansCounter--
            }
        },
        setPartner: (state, { payload }) => {
            state.partner = payload.partner
        },
        setBook: (state, { payload }) => {
            state.book = payload.book
        },
        cleanLoanBookAndPartner: (state) => {
            state.book = null
            state.partner = null
        },
        updateLoanState: (state, { payload }) => {
            if (payload.returned === 0) {
                state.activeLoansCounter++
            } else {
                state.activeLoansCounter--
            }

            state.isLoading = false
        },
        setOrderBy: (state, { payload }) => {
            state.orderBy.field = payload.field
            state.orderBy.order = payload.order
        }
    }
})

export const {
    setLoading,
    setNotLoading,
    setLoans,
    addLoan,
    setPartner,
    setBook,
    deleteLoan,
    cleanLoanBookAndPartner,
    updateLoanState,
    setOrderBy
} = loansSlice.actions
