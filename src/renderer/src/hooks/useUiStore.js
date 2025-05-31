import { useDispatch, useSelector } from 'react-redux'
import {
    onCloseAddBookModal,
    onCloseAddPartnerModal,
    onCloseBookModal,
    onCloseConfirmModal,
    onCloseDuplicateBookModal,
    onCloseLoanModal,
    onCloseLoginModal,
    onClosePartnerModal,
    onCloseRegisterModal,
    onHideAlert,
    onOpenAddBookModal,
    onOpenAddPartnerModal,
    onOpenBookModal,
    onOpenConfirmModal,
    onOpenDuplicateBookModal,
    onOpenLoanModal,
    onOpenLoginModal,
    onOpenPartnerModal,
    onOpenRegisterModal,
    onShowAlert
} from '../store'

export const useUiStore = () => {
    const dispatch = useDispatch()

    const {
        isLoginModalOpen,
        isLoanModalOpen,
        isRegisterModalOpen,
        isAddBookModalOpen,
        isBookModalOpen,
        isDuplicateBookModalOpen,
        isAddPartnerModalOpen,
        isPartnerModalOpen,
        book,
        duplicateBook,
        editBook,
        partner,
        editPartner,
        alert,
        confirmModal
    } = useSelector((state) => state.ui)

    return {
        isLoanModalOpen,
        isLoginModalOpen,
        isRegisterModalOpen,
        isAddBookModalOpen,
        isBookModalOpen,
        isDuplicateBookModalOpen,
        isAddPartnerModalOpen,
        isPartnerModalOpen,
        alert,
        book,
        duplicateBook,
        editBook,
        partner,
        editPartner,
        confirmModal,

        openLoginModal: () => dispatch(onOpenLoginModal()),
        closeLoginModal: () => dispatch(onCloseLoginModal()),

        openRegisterModal: () => dispatch(onOpenRegisterModal()),
        closeRegisterModal: () => dispatch(onCloseRegisterModal()),

        openLoanModal: () => dispatch(onOpenLoanModal()),
        closeLoanModal: () => dispatch(onCloseLoanModal()),

        openAddBookModal: (editBook = null) => dispatch(onOpenAddBookModal({ editBook })),
        closeAddBookModal: () => dispatch(onCloseAddBookModal()),

        openBookModal: (book) => dispatch(onOpenBookModal({ book })),
        closeBookModal: () => dispatch(onCloseBookModal()),

        openDuplicateBookModal: (duplicateBook) => dispatch(onOpenDuplicateBookModal({ duplicateBook })),
        closeDuplicateBookModal: () => dispatch(onCloseDuplicateBookModal()),

        openAddPartnerModal: (editPartner = null) =>
            dispatch(onOpenAddPartnerModal({ editPartner })),
        closeAddPartnerModal: () => dispatch(onCloseAddPartnerModal()),

        openPartnerModal: (partner) => dispatch(onOpenPartnerModal({ partner })),
        closePartnerModal: () => dispatch(onClosePartnerModal()),

        onShowAlert: (message, type) => dispatch(onShowAlert({ message, type })),
        onHideAlert: () => dispatch(onHideAlert()),

        openConfirmModal: (payload) => dispatch(onOpenConfirmModal(payload)),
        closeConfirmModal: () => dispatch(onCloseConfirmModal())
    }
}
