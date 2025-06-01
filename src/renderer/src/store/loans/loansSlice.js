import { createSlice } from '@reduxjs/toolkit'

export const loansSlice = createSlice({
    name: 'loans',
    initialState: {
        loans: [],
        isLoading: true,
        partner: null,
        book: null,
        error: null,
        activeLoansCounter: 0
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
            state.isLoading = false
            state.error = null

            for (const loan of payload.loans) {
                if (!loan.returned && new Date(loan.date_end) > new Date()) {
                    state.activeLoansCounter++
                }
            }
        },
        addLoan: (state, { payload }) => {
            state.loans.push(payload.loan)

            if (!payload.loan.returned && new Date(payload.loan.date_end) > new Date()) {
                state.activeLoansCounter++
            }
        },
        setPartner: (state, { payload }) => {
            state.partner = payload.partner
        },
        setBook: (state, { payload }) => {
            state.book = payload.book
        }
    }
})

export const { setLoading, setNotLoading, setLoans, addLoan, setPartner, setBook } =
    loansSlice.actions
