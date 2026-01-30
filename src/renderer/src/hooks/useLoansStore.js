import { useDispatch, useSelector } from 'react-redux'
import {
    addLoan,
    cleanLoanBookAndPartner,
    setBook,
    setLoading,
    setLoans,
    setNotLoading,
    setPartner,
    setOrderBy,
    updateLoanState,
    deleteLoan
} from '../store/loans/loansSlice'
import { useBooksStore } from './useBooksStore'
import { usePartnersStore } from './usePartnersStore'
import { useReportsStore } from './useReportsStore'
import { LOANS_LIMIT } from '../consts'

const validFields = ['date_start', 'date_end']

export const useLoansStore = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const {
        loans,
        page,
        isLast,
        counter,
        isLoading,
        partner,
        book,
        error,
        activeLoansCounter,
        orderBy
    } = useSelector((state) => state.loans)
    const { startUpdatingBookState } = useBooksStore()
    const { startLoadingPartners, addingNewActiveLoan } = usePartnersStore()
    const {
        startLoadingBooksReports,
        startLoadingThemesReports,
        startLoadingMostReaderSectionReports,
        setNotLoadingWithoutError
    } = useReportsStore()

    const startLoadingLoans = async (
        page = 0,
        orderBy = { field: 'date_start', order: 'desc' },
        query = undefined
    ) => {
        dispatch(setLoading())

        try {
            const response = await window.loansApi.getLoans({
                offset: page * LOANS_LIMIT,
                limit: LOANS_LIMIT,
                orderBy: orderBy.field,
                order: orderBy.order,
                search: query
            })

            if (!response.ok) throw new Error('Failed to fetch loans')

            dispatch(setLoans(response))
        } catch (error) {
            console.error('Error loading loans:', error)
            dispatch(setNotLoading({ error: 'Error al obtener los prestamos' }))
        }
    }

    const startAddingLoan = async (loan) => {
        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            const response = await window.loansApi.addLoan(loan, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to add loan')

            dispatch(addLoan())

            startLoadingLoans(page, orderBy)

            await startUpdatingBookState({
                id: book.id,
                borrowed: 1
            })

            addingNewActiveLoan({
                id: partner.id,
                date_end: loan.date_end
            })

            dispatch(cleanLoanBookAndPartner())

            startLoadingBooksReports()
            startLoadingThemesReports()
            startLoadingMostReaderSectionReports()
            setNotLoadingWithoutError()

            return true
        } catch (error) {
            console.error('Error adding loan:', error)
            dispatch(setNotLoading({ error: 'Error al agregar el prestamo' }))
            return false
        }
    }

    const multipleAddLoans = async (importedLoans = []) => {
        const isLoansArray = checkIfIsLoansArray(importedLoans)

        if (!isLoansArray) return

        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            if (loans.length > 0) {
                const deleteResponse = await window.loansApi.deleteAllLoans(user.sessionToken)

                if (!deleteResponse.ok)
                    throw new Error(deleteResponse.msg || 'Failed to delete loans')
            }

            const response = await window.loansApi.addMultipleLoans(
                importedLoans,
                user.sessionToken
            )

            if (!response.ok) throw new Error(response.msg || 'Failed to add loans')

            dispatch(setOrderBy({ field: 'date_start', order: 'desc' }))
            startLoadingLoans(0, { field: 'date_start', order: 'desc' })

            const updateBookStatePromises = []

            importedLoans
                .filter((loan) => loan.returned === 0)
                .forEach(async (loan) => {
                    updateBookStatePromises.push(
                        startUpdatingBookState({
                            id: loan.auto_book_id,
                            borrowed: 1
                        })
                    )
                })

            await Promise.all(updateBookStatePromises)

            await startLoadingPartners()

            startLoadingBooksReports()
            startLoadingThemesReports()
            startLoadingMostReaderSectionReports()
            setNotLoadingWithoutError()

            return true
        } catch (error) {
            console.error('Error adding loans:', error)
            dispatch(setNotLoading({ error: 'Error al agregar los prestamos' }))
            return false
        }
    }

    const returnLoan = async ({ id, book_id }) => {
        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            const response = await window.loansApi.updateLoanState(id, 1, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to return loan')

            dispatch(updateLoanState({ returned: 1 }))

            startLoadingLoans(page, orderBy)

            await startUpdatingBookState({
                id: book_id,
                borrowed: 0
            })

            await startLoadingPartners()

            return true
        } catch (error) {
            console.error('Error returning loan:', error)
            dispatch(setNotLoading({ error: 'Error al devolver el prestamo' }))
            return false
        }
    }

    const startDeletingLoan = async ({ id }) => {
        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            const loan = await window.loansApi.getLoan(id)
            const response = await window.loansApi.deleteLoan(id, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to delete loan')

            dispatch(deleteLoan(loan))

            startLoadingLoans(page, orderBy)

            startLoadingBooksReports()
            startLoadingThemesReports()
            startLoadingMostReaderSectionReports()

            if (loan.returned === 0) {
                await startUpdatingBookState({
                    id: loan.auto_book_id,
                    borrowed: 0
                })
            }

            await startLoadingPartners()

            setNotLoadingWithoutError()

            return true
        } catch (error) {
            console.error('Error deleting loan:', error)
            dispatch(setNotLoading({ error: 'Error al eliminar el prestamo' }))
            return false
        }
    }

    const checkIfIsLoansArray = (loans) => {
        if (!Array.isArray(loans)) return false

        for (const loan of loans) {
            if (typeof loan !== 'object') return false

            if (
                !loan.date_start ||
                !loan.date_end ||
                (!loan.returned && loan.returned !== 0) ||
                !loan.book_id ||
                !loan.partner_id
            )
                return false
        }

        return true
    }

    const setLoanPartner = (partner) => {
        dispatch(setPartner({ partner }))
    }

    const setLoanBook = (book) => {
        dispatch(setBook({ book }))
    }

    const sortBy = (field) => {
        if (!validFields.includes(field)) return

        const newOrder =
            orderBy.field === field ? (orderBy.order === 'asc' ? 'desc' : 'asc') : 'asc'

        dispatch(
            setOrderBy({
                field,
                order: newOrder
            })
        )

        startLoadingLoans(page, { field, order: newOrder })
    }

    return {
        loans,
        page,
        isLast,
        counter,
        isLoading,
        partner,
        book,
        error,
        activeLoansCounter,
        orderBy,

        startLoadingLoans,
        startAddingLoan,
        multipleAddLoans,
        returnLoan,
        startDeletingLoan,
        checkIfIsLoansArray,
        setLoanPartner,
        setLoanBook,
        sortBy
    }
}
