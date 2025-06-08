import { useDispatch, useSelector } from 'react-redux'
import { setAuthorsWithMoreBooks, setLoading, setNotLoading } from '../store/reports/reportsSlice'

export const useReportsStore = () => {
    const dispatch = useDispatch()
    const { authorsWithMoreBooks, mostBorrowedBooks, mostPopularThemes, mostReaderSection } =
        useSelector((state) => state.reports)

    const startLoadingAuthors = async () => {
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

    return {
        authorsWithMoreBooks,
        mostBorrowedBooks,
        mostPopularThemes,
        mostReaderSection,
        startLoadingAuthors
    }
}
