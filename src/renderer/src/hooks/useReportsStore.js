import { useDispatch, useSelector } from 'react-redux'
import {
    setAuthorsWithMoreBooks,
    setLoading,
    setMostBorrowedBooks,
    setMostPopularThemes,
    setMostReaderSection,
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

    const startLoadingThemesReports = async () => {
        dispatch(setLoading())

        try {
            const response = await window.reportsApi.getMostPopularThemes()

            if (!response.ok) throw new Error('Failed to fetch themes')

            dispatch(setMostPopularThemes({ mostPopularThemes: response.themes }))
        } catch (error) {
            console.error('Error loading themes:', error)
            dispatch(setNotLoading({ error: 'Error al obtener los temas' }))
        }
    }

    const startLoadingMostReaderSectionReports = async () => {
        dispatch(setLoading())

        try {
            const response = await window.reportsApi.getMostReaderSection()

            if (!response.ok) throw new Error('Failed to fetch sections')

            dispatch(setMostReaderSection({ mostReaderSection: response.sections }))
        } catch (error) {
            console.error('Error loading sections', error)
            dispatch(setNotLoading({ error: 'Error al obtener las secciones' }))
        }
    }

    const setNotLoadingWithoutError = () => {
        dispatch(setNotLoading({ error: null }))
    }

    return {
        authorsWithMoreBooks,
        mostBorrowedBooks,
        mostPopularThemes,
        mostReaderSection,

        startLoadingAuthorsReports,
        startLoadingBooksReports,
        startLoadingThemesReports,
        startLoadingMostReaderSectionReports,
        setNotLoadingWithoutError
    }
}
