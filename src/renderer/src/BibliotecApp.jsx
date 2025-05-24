import { useEffect } from 'react'
import { Header, LoginModal, RegisterModal, Alert } from './components/commons'
import { AppRouter } from './routers/AppRouter'
import { useAuthStore, useUiStore } from './hooks'

export const BibliotecApp = () => {
    const { errorMessage } = useAuthStore()
    const { onShowAlert } = useUiStore()

    useEffect(() => {
        if (errorMessage) onShowAlert(errorMessage, 'error')
    }, [errorMessage])

    return (
        <>
            <Header />
            <AppRouter />
            <LoginModal />
            <RegisterModal />
            <Alert />
        </>
    )
}
