import { useDispatch, useSelector } from 'react-redux'
import {
    onCloseLoanModal,
    onCloseLoginModal,
    onCloseRegisterModal,
    onHideAlert,
    onOpenLoanModal,
    onOpenLoginModal,
    onOpenRegisterModal,
    onShowAlert
} from '../store'

export const useUiStore = () => {
    const dispatch = useDispatch()

    const { isLoginModalOpen, isLoanModalOpen, isRegisterModalOpen, alert } = useSelector(
        (state) => state.ui
    )

    return {
        isLoanModalOpen,
        isLoginModalOpen,
        isRegisterModalOpen,
        ...alert,
        openLoginModal: () => dispatch(onOpenLoginModal()),
        closeLoginModal: () => dispatch(onCloseLoginModal()),
        openRegisterModal: () => dispatch(onOpenRegisterModal()),
        closeRegisterModal: () => dispatch(onCloseRegisterModal()),
        openLoanModal: () => dispatch(onOpenLoanModal()),
        closeLoanModal: () => dispatch(onCloseLoanModal()),
        onShowAlert: (message, type) => dispatch(onShowAlert({ message, type })),
        onHideAlert: () => dispatch(onHideAlert())
    }
}
