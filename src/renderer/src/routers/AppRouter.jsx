import { Navigate, Route, Routes } from 'react-router-dom'
import { BooksPage, HomePage, LoansPage, UsersPage } from '../pages'
import { useAuthStore, useBooksStore, useLoansStore, usePartnersStore } from '../hooks'
import { useEffect } from 'react'
import { ReportsPage } from '../pages/ReportsPage'
import { useReportsStore } from '../hooks/useReportsStore'

export const AppRouter = () => {
    const { checkAuthToken } = useAuthStore()
    const { startLoadingBooks, getBooksCount } = useBooksStore()
    const { startLoadingPartners, getPartnersCount } = usePartnersStore()
    const { startLoadingLoans, getActiveLoansCount } = useLoansStore()
    const {
        startLoadingAuthorsReports,
        startLoadingBooksReports,
        startLoadingThemesReports,
        startLoadingMostReaderSectionReports,
        setNotLoadingWithoutError
    } = useReportsStore()

    useEffect(() => {
        checkAuthToken()
        startLoadingBooks()
        getBooksCount()
        startLoadingPartners()
        getPartnersCount()
        startLoadingLoans()
        getActiveLoansCount()
        startLoadingAuthorsReports()
        startLoadingBooksReports()
        startLoadingThemesReports()
        startLoadingMostReaderSectionReports()
        setNotLoadingWithoutError()
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
