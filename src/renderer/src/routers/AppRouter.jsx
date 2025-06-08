import { Navigate, Route, Routes } from 'react-router-dom'
import { BooksPage, HomePage, LoansPage, UsersPage } from '../pages'
import { useAuthStore, useBooksStore, useLoansStore, usePartnersStore } from '../hooks'
import { useEffect } from 'react'
import { ReportsPage } from '../pages/ReportsPage'
import { useReportsStore } from '../hooks/useReportsStore'

export const AppRouter = () => {
    const { checkAuthToken } = useAuthStore()
    const { startLoadingBooks } = useBooksStore()
    const { startLoadingPartners } = usePartnersStore()
    const { startLoadingLoans } = useLoansStore()
    const { startLoadingAuthorsReports, startLoadingBooksReports, startLoadingThemesReports } =
        useReportsStore()

    useEffect(() => {
        checkAuthToken()
        startLoadingBooks()
        startLoadingPartners()
        startLoadingLoans()
        startLoadingAuthorsReports()
        startLoadingBooksReports()
        startLoadingThemesReports()
    }, [])

    return (
        <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/loans" element={<LoansPage />} />
            <Route path="/catalog" element={<BooksPage />} />
            <Route path="/users" element={<UsersPage />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/*" element={<Navigate to="/" />} />
        </Routes>
    )
}
