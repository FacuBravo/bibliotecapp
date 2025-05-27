import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoginModalOpen: false,
        isRegisterModalOpen: false,
        isLoanModalOpen: false,
        isAddBookModalOpen: false,
        alert: {
            show: false,
            message: null,
            type: null
        }
    },
    reducers: {
        onOpenLoginModal: (state) => {
            state.isLoginModalOpen = true
        },
        onCloseLoginModal: (state) => {
            state.isLoginModalOpen = false
        },
        onOpenRegisterModal: (state) => {
            state.isRegisterModalOpen = true
        },
        onCloseRegisterModal: (state) => {
            state.isRegisterModalOpen = false
        },
        onOpenLoanModal: (state) => {
            state.isLoanModalOpen = true
        },
        onCloseLoanModal: (state) => {
            state.isLoanModalOpen = false
        },
        onOpenAddBookModal: (state) => {
            state.isAddBookModalOpen = true
        },
        onCloseAddBookModal: (state) => {
            state.isAddBookModalOpen = false
        },
        onShowAlert: (state, { payload }) => {
            state.alert.show = true
            state.alert.message = payload.message
            state.alert.type = payload.type
        },
        onHideAlert: (state) => {
            state.alert.show = false
            state.alert.message = null
            state.alert.type = null
        }
    }
})

export const {
    onOpenLoginModal,
    onCloseLoginModal,
    onOpenLoanModal,
    onCloseLoanModal,
    onOpenRegisterModal,
    onCloseRegisterModal,
    onOpenAddBookModal,
    onCloseAddBookModal,
    onShowAlert,
    onHideAlert
} = uiSlice.actions
