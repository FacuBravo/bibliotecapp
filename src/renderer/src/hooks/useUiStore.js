import { useDispatch, useSelector } from 'react-redux'
import {
    onCloseAddBookModal,
    onCloseBookModal,
    onCloseLoanModal,
    onCloseLoginModal,
    onCloseRegisterModal,
    onHideAlert,
    onOpenAddBookModal,
    onOpenBookModal,
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
        alert
    } = useSelector((state) => state.ui)

    return {
        isLoanModalOpen,
        isLoginModalOpen,
        isRegisterModalOpen,
        isAddBookModalOpen,
        isBookModalOpen,
        ...alert,
        book,
        openLoginModal: () => dispatch(onOpenLoginModal()),
        closeLoginModal: () => dispatch(onCloseLoginModal()),
        openRegisterModal: () => dispatch(onOpenRegisterModal()),
        closeRegisterModal: () => dispatch(onCloseRegisterModal()),
        openLoanModal: () => dispatch(onOpenLoanModal()),
        closeLoanModal: () => dispatch(onCloseLoanModal()),
        openAddBookModal: () => dispatch(onOpenAddBookModal()),
        closeAddBookModal: () => dispatch(onCloseAddBookModal()),
        openBookModal: (book) => dispatch(onOpenBookModal({ book })),
        closeBookModal: () => dispatch(onCloseBookModal()),
        onShowAlert: (message, type) => dispatch(onShowAlert({ message, type })),
        onHideAlert: () => dispatch(onHideAlert())
    }
}
