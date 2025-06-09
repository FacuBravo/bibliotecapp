import { createSlice } from '@reduxjs/toolkit'

export const loansSlice = createSlice({
    name: 'loans',
    initialState: {
        loans: [],
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
            state.activeLoansCounter = 0
            state.isLoading = false
            state.error = null

            for (const loan of payload.loans) {
                if (loan.returned === 0) {
                    state.activeLoansCounter++
                }
            }
        },
        addLoan: (state, { payload }) => {
            state.loans.push(payload.loan)

            if (payload.loan.returned === 0) {
                state.activeLoansCounter++
            }
        },
        deleteLoan: (state, { payload }) => {
            state.isLoading = false

            const loan = state.loans.find((loan) => loan.id === payload.id)
            state.loans = state.loans.filter((loan) => loan.id !== payload.id)

            if (loan.returned === 0) {
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
            state.loans = state.loans.map((loan) => {
                if (loan.id === payload.id) {
                    if (payload.returned === 0) {
                        state.activeLoansCounter++
                    } else {
                        state.activeLoansCounter--
                    }

                    return {
                        ...loan,
                        returned: payload.returned
                    }
                }

                return loan
            })

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
