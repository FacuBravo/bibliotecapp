import { createSlice } from '@reduxjs/toolkit'

export const partnersSlice = createSlice({
    name: 'partners',
    initialState: {
        partners: [],
        page: 0,
        isLast: false,
        isLoading: true,
        error: null,
        counter: 0,
        orderBy: {
            field: 'id',
            order: 'asc'
        }
    },
    reducers: {
        setLoading: (state) => {
            state.isLoading = true
        },
        setNotLoading: (state, { payload }) => {
            state.isLoading = false
            state.error = payload?.error || null
        },
        setPartners: (state, { payload }) => {
            state.partners = payload.partners
            state.page = payload.page
            state.isLast = payload.isLast
            state.isLoading = false
            state.error = null
            state.counter = payload.total
        },
        addPartner: (state) => {
            state.counter += 1
        },
        addPartnerNewActiveLoan: (state, { payload }) => {
            state.partners = state.partners.map((partner) => {
                if (partner.id === payload.id) {
                    return {
                        ...partner,
                        active_loans: partner.active_loans + ',' + payload.date_end
                    }
                }

                return partner
            })
        },
        deletePartner: (state) => {
            state.counter -= 1
        },
        setOrderBy: (state, { payload }) => {
            state.orderBy.field = payload.field
            state.orderBy.order = payload.order
        }
    }
})

export const {
    setPartners,
    setLoading,
    setNotLoading,
    addPartner,
    addPartnerNewActiveLoan,
    deletePartner,
    setOrderBy
} = partnersSlice.actions
