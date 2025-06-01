import { Navigate, Route, Routes } from 'react-router-dom'
import { BooksPage, HomePage, LoansPage, UsersPage } from '../pages'
import { useAuthStore, useBooksStore, useLoansStore, usePartnersStore } from '../hooks'
import { useEffect } from 'react'

export const AppRouter = () => {
    const { checkAuthToken } = useAuthStore()
    const { startLoadingBooks } = useBooksStore()
    const { startLoadingPartners } = usePartnersStore()
    const { startLoadingLoans } = useLoansStore()

    useEffect(() => {
        checkAuthToken()
        startLoadingBooks()
        startLoadingPartners()
        startLoadingLoans()
    }, [])

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/catalog" element={<BooksPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
