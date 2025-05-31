import { createSlice } from '@reduxjs/toolkit'

export const uiSlice = createSlice({
    name: 'ui',
    initialState: {
        isLoginModalOpen: false,
        isRegisterModalOpen: false,
        isLoanModalOpen: false,
        isAddBookModalOpen: false,
        editBook: null,
        isBookModalOpen: false,
        book: null,
        isDuplicateBookModalOpen: false,
        duplicateBook: null,
        isAddPartnerModalOpen: false,
        editPartner: null,
        isPartnerModalOpen: false,
        partner: null,
        alert: {
            show: false,
            message: null,
            type: null
        },
        confirmModal: {
            show: false,
            title: null,
            message: null,
            onConfirm: null
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

        onOpenAddBookModal: (state, { payload }) => {
            state.isAddBookModalOpen = true

            if (payload.editBook) state.editBook = payload.editBook
        },
        onCloseAddBookModal: (state) => {
            state.isAddBookModalOpen = false
            state.editBook = null
        },

        onOpenBookModal: (state, { payload }) => {
            state.isBookModalOpen = true
            state.book = payload.book
        },
        onCloseBookModal: (state) => {
            state.isBookModalOpen = false
            state.book = null
        },

        onOpenDuplicateBookModal: (state, { payload }) => {
            state.isDuplicateBookModalOpen = true
            state.duplicateBook = payload.duplicateBook
        },
        onCloseDuplicateBookModal: (state) => {
            state.isDuplicateBookModalOpen = false
            state.duplicateBook = null
        },

        onOpenAddPartnerModal: (state, { payload }) => {
            state.isAddPartnerModalOpen = true

            if (payload.editPartner) state.editPartner = payload.editPartner
        },
        onCloseAddPartnerModal: (state) => {
            state.isAddPartnerModalOpen = false
            state.editPartner = null
        },

        onOpenPartnerModal: (state, { payload }) => {
            state.isPartnerModalOpen = true
            state.partner = payload.partner
        },
        onClosePartnerModal: (state) => {
            state.isPartnerModalOpen = false
            state.partner = null
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
        },

        onOpenConfirmModal: (state, { payload }) => {
            state.confirmModal.show = true
            state.confirmModal.title = payload.title
            state.confirmModal.message = payload.message
            state.confirmModal.onConfirm = payload.onConfirm
        },
        onCloseConfirmModal: (state) => {
            state.confirmModal.show = false
            state.confirmModal.title = null
            state.confirmModal.message = null
            state.confirmModal.onConfirm = null
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

    onOpenBookModal,
    onCloseBookModal,

    onOpenDuplicateBookModal,
    onCloseDuplicateBookModal,

    onOpenAddPartnerModal,
    onCloseAddPartnerModal,

    onOpenPartnerModal,
    onClosePartnerModal,

    onShowAlert,
    onHideAlert,

    onOpenConfirmModal,
    onCloseConfirmModal
} = uiSlice.actions
