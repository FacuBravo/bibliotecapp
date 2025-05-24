import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage, LoansPage } from '../pages'
import { useAuthStore } from '../hooks'
import { useEffect } from 'react'

export const AppRouter = () => {
    const { checkAuthToken } = useAuthStore()

    useEffect(() => {
        checkAuthToken()
    }, [])

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
