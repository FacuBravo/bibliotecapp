import { useDispatch, useSelector } from 'react-redux'
import {
    onCloseAddBookModal,
    onCloseBookModal,
    onCloseConfirmModal,
    onCloseLoanModal,
    onCloseLoginModal,
    onCloseRegisterModal,
    onHideAlert,
    onOpenAddBookModal,
    onOpenBookModal,
    onOpenConfirmModal,
    onOpenLoanModal,
    onOpenLoginModal,
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
        book,
        editBook,
        alert,
        confirmModal
    } = useSelector((state) => state.ui)

    return {
        isLoanModalOpen,
        isLoginModalOpen,
        isRegisterModalOpen,
        isAddBookModalOpen,
        isBookModalOpen,
        alert,
        book,
        editBook,
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

        onShowAlert: (message, type) => dispatch(onShowAlert({ message, type })),
        onHideAlert: () => dispatch(onHideAlert()),

        openConfirmModal: (payload) => dispatch(onOpenConfirmModal(payload)),
        closeConfirmModal: () => dispatch(onCloseConfirmModal())
    }
}
