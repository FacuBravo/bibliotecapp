import { createSlice } from '@reduxjs/toolkit'

export const partnersSlice = createSlice({
    name: 'partners',
    initialState: {
        partners: [],
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
            state.error = payload.error || null
        },
        setPartners: (state, { payload }) => {
            state.partners = payload.partners
            state.isLoading = false
            state.error = null
            state.counter = payload.partners.length
        },
        addPartner: (state, { payload }) => {
            state.partners.push(payload.partner)
            state.counter += 1
        },
        updatePartner: (state, { payload }) => {
            state.partners = state.partners.map((partner) =>
                partner.id === payload.partner.id ? payload.partner : partner
            )
            state.isLoading = false
        },
        deletePartner: (state, { payload }) => {
            state.partners = state.partners.filter((partner) => partner.id !== payload.id)
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
    updatePartner,
    deletePartner,
    setOrderBy
} = partnersSlice.actions
