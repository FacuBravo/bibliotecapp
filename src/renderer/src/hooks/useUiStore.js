import { useDispatch, useSelector } from 'react-redux'
import {
    onCloseAddBookModal,
    onCloseLoanModal,
    onCloseLoginModal,
    onCloseRegisterModal,
    onHideAlert,
    onOpenAddBookModal,
    onOpenLoanModal,
    onOpenLoginModal,
    onOpenRegisterModal,
    onShowAlert
} from '../store'

export const useUiStore = () => {
    const dispatch = useDispatch()

    const { isLoginModalOpen, isLoanModalOpen, isRegisterModalOpen, isAddBookModalOpen, alert } =
        useSelector((state) => state.ui)

    return {
        isLoanModalOpen,
        isLoginModalOpen,
        isRegisterModalOpen,
        isAddBookModalOpen,
        ...alert,
        openLoginModal: () => dispatch(onOpenLoginModal()),
        closeLoginModal: () => dispatch(onCloseLoginModal()),
        openRegisterModal: () => dispatch(onOpenRegisterModal()),
        closeRegisterModal: () => dispatch(onCloseRegisterModal()),
        openLoanModal: () => dispatch(onOpenLoanModal()),
        closeLoanModal: () => dispatch(onCloseLoanModal()),
        openAddBookModal: () => dispatch(onOpenAddBookModal()),
        closeAddBookModal: () => dispatch(onCloseAddBookModal()),
        onShowAlert: (message, type) => dispatch(onShowAlert({ message, type })),
        onHideAlert: () => dispatch(onHideAlert())
    }
}
