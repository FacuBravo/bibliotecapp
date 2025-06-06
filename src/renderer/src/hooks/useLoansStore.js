import { useDispatch, useSelector } from 'react-redux'
import {
    addLoan,
    cleanLoanBookAndPartner,
    setBook,
    setLoading,
    setLoans,
    setNotLoading,
    setPartner
} from '../store/loans/loansSlice'

export const useLoansStore = () => {
    const dispatch = useDispatch()
    const { user } = useSelector((state) => state.auth)
    const { loans, isLoading, partner, book, error, activeLoansCounter } = useSelector(
        (state) => state.loans
    )

    const startLoadingLoans = async () => {
        dispatch(setLoading())

        try {
            const response = await window.loansApi.getLoans()

            if (!response.ok) throw new Error('Failed to fetch loans')

            dispatch(setLoans({ loans: response.loans }))
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

            dispatch(
                addLoan({
                    loan: {
                        ...response.loan,
                        title: book.title,
                        surname: partner.surname,
                        name: partner.name
                    }
                })
            )

            dispatch(cleanLoanBookAndPartner())

            return true
        } catch (error) {
            console.error('Error adding loan:', error)
            dispatch(setNotLoading({ error: 'Error al agregar el prestamo' }))
            return false
        }
    }

    const multipleAddLoans = async (loans) => {
        const isLoansArray = checkIfIsLoansArray(loans)

        if (!isLoansArray) return

        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            if (loans.length > 0) {
                const deleteResponse = await window.loansApi.deleteAllLoans(user.sessionToken)

                if (!deleteResponse.ok)
                    throw new Error(deleteResponse.msg || 'Failed to delete loans')
            }

            const response = await window.loansApi.addMultipleLoans(loans, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to add loans')

            dispatch(setLoans({ loans: response.loans }))

            return true
        } catch (error) {
            console.error('Error adding loans:', error)
            dispatch(setNotLoading({ error: 'Error al agregar los prestamos' }))
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
                !loan.returned ||
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

    return {
        loans,
        isLoading,
        partner,
        book,
        error,
        activeLoansCounter,

        startLoadingLoans,
        startAddingLoan,
        multipleAddLoans,
        checkIfIsLoansArray,
        setLoanPartner,
        setLoanBook
    }
}
