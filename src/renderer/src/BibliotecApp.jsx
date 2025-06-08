import { useEffect } from 'react'
import { Header, LoginModal, RegisterModal, Alert, ConfirmModal } from './components/commons'
import { AppRouter } from './routers/AppRouter'
import { useAuthStore, useBooksStore, useLoansStore, usePartnersStore, useUiStore } from './hooks'

export const BibliotecApp = () => {
    const { errorMessage: authError } = useAuthStore()
    const { error: booksError } = useBooksStore()
    const { error: partnersError } = usePartnersStore()
    const { error: loansError } = useLoansStore()
    const { onShowAlert } = useUiStore()

    useEffect(() => {
        if (authError) onShowAlert(authError, 'error')
    }, [authError])

    useEffect(() => {
        if (booksError) onShowAlert(booksError, 'error')
    }, [booksError])

    useEffect(() => {
        if (partnersError) onShowAlert(partnersError, 'error')
    }, [partnersError])

    useEffect(() => {
        if (loansError) onShowAlert(loansError, 'error')
    }, [loansError])

    return (
        <>
            <Header />
            <AppRouter />
            <LoginModal />
            <RegisterModal />
            <Alert />
            <ConfirmModal />
        </>
    )
}
