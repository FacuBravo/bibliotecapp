import { useDispatch, useSelector } from 'react-redux'
import {
    setAuthorsWithMoreBooks,
    setLoading,
    setMostBorrowedBooks,
    setNotLoading
} from '../store/reports/reportsSlice'

export const useReportsStore = () => {
    const dispatch = useDispatch()
    const { authorsWithMoreBooks, mostBorrowedBooks, mostPopularThemes, mostReaderSection } =
        useSelector((state) => state.reports)

    const startLoadingAuthorsReports = async () => {
        dispatch(setLoading())

        try {
            const response = await window.reportsApi.getAuthorsWithMoreBooks()

            if (!response.ok) throw new Error('Failed to fetch authors')

            dispatch(setAuthorsWithMoreBooks({ authorsWithMoreBooks: response.authors }))
        } catch (error) {
            console.error('Error loading authors:', error)
            dispatch(setNotLoading({ error: 'Error al obtener los autores' }))
        }
    }

    const startLoadingBooksReports = async () => {
        dispatch(setLoading())

        try {
            const response = await window.reportsApi.getMostBorrowedBooks()

            if (!response.ok) throw new Error('Failed to fetch books')

            dispatch(setMostBorrowedBooks({ mostBorrowedBooks: response.books }))
        } catch (error) {
            console.error('Error loading books:', error)
            dispatch(setNotLoading({ error: 'Error al obtener los libros' }))
        }
    }

    return {
        authorsWithMoreBooks,
        mostBorrowedBooks,
        mostPopularThemes,
        mostReaderSection,

        startLoadingAuthorsReports,
        startLoadingBooksReports
    }
}
