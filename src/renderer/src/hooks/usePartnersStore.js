import { useDispatch, useSelector } from 'react-redux'
import {
    addPartner,
    deletePartner,
    setPartners,
    setLoading,
    setNotLoading,
    updatePartner,
    setOrderBy,
    addPartnerNewActiveLoan
} from '../store/partners/partnersSlice'
import { orderObjectsArray } from '../helpers'
import { useReportsStore } from './useReportsStore'

const validFields = ['id', 'surname', 'type']

export const usePartnersStore = () => {
    const dispatch = useDispatch()
    const { partners, isLoading, error, counter, orderBy } = useSelector((state) => state.partners)
    const { user } = useSelector((state) => state.auth)
    const { startLoadingMostReaderSectionReports, setNotLoadingWithoutError } = useReportsStore()

    const startLoadingPartners = async () => {
        dispatch(setLoading())

        try {
            const response = await window.partnersApi.getPartners()

            if (!response.ok) throw new Error('Failed to fetch partners')

            dispatch(setPartners({ partners: response.partners }))
        } catch (error) {
            console.error('Error loading partners:', error)
            dispatch(setNotLoading({ error: 'Error al obtener los usuarios' }))
        }
    }

    const startAddingPartner = async (partner) => {
        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            const response = await window.partnersApi.addPartner(partner, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to add partner')

            dispatch(addPartner({ partner: { ...response.partner, active_loans: null } }))

            startLoadingMostReaderSectionReports()
            setNotLoadingWithoutError()

            return true
        } catch (error) {
            console.error('Error adding partner:', error)
            dispatch(setNotLoading({ error: 'Error al agregar el usuario' }))
            return false
        }
    }

    const startUpdatingPartner = async (partner) => {
        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            const response = await window.partnersApi.updatePartner(partner, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to update partner')

            dispatch(
                updatePartner({
                    partner: response.partner
                })
            )

            startLoadingMostReaderSectionReports()
            setNotLoadingWithoutError()

            return true
        } catch (error) {
            console.error('Error updating partner:', error)
            dispatch(setNotLoading({ error: 'Error al actualizar el libro' }))
            return false
        }
    }

    const startDeletingPartner = async ({ id }) => {
        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            const response = await window.partnersApi.deletePartner(id, user.sessionToken)

            if (!response.ok) throw new Error(response.msg || 'Failed to delete partner')

            dispatch(deletePartner({ id }))

            startLoadingMostReaderSectionReports()
            setNotLoadingWithoutError()

            return true
        } catch (error) {
            console.error('Error deleting partner:', error)
            dispatch(setNotLoading({ error: 'Error al eliminar el libro' }))
            return false
        }
    }

    const multipleAddPartners = async (importedPartners) => {
        const isPartnersArray = checkIfIsPartnersArray(importedPartners)

        if (!isPartnersArray) return

        if (!user || !user.sessionToken) return

        dispatch(setLoading())

        try {
            if (counter > 0) {
                const deleteResponse = await window.partnersApi.deleteAllPartners(user.sessionToken)

                if (!deleteResponse.ok)
                    throw new Error(deleteResponse.msg || 'Failed to delete partners')
            }

            const response = await window.partnersApi.addMultiplePartners(
                importedPartners,
                user.sessionToken
            )

            if (!response.ok) throw new Error(response.msg || 'Failed to add partners')

            const partnersWithActiveLoans = response.partners.map((partner) => ({
                ...partner,
                active_loans: null
            }))

            dispatch(setPartners({ partners: partnersWithActiveLoans }))
            dispatch(setOrderBy({ field: 'id', order: 'asc' }))

            startLoadingMostReaderSectionReports()
            setNotLoadingWithoutError()

            return true
        } catch (error) {
            console.error('Error adding partners:', error)
            dispatch(setNotLoading({ error: 'Error al agregar los usuarios' }))
            return false
        }
    }

    const addingNewActiveLoan = ({ id, date_end }) => {
        if (!user || !user.sessionToken) return

        dispatch(addPartnerNewActiveLoan({ id, date_end }))
    }

    const checkIfIsPartnersArray = (partners) => {
        if (!Array.isArray(partners)) return false

        for (const partner of partners) {
            if (typeof partner !== 'object') return false

            if (!partner.name || !partner.surname) return false
        }

        return true
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

        const sortedPartners = orderObjectsArray([...partners], field, newOrder)

        dispatch(setPartners({ partners: sortedPartners }))
    }

    return {
        partners,
        isLoading,
        error,
        counter,
        orderBy,

        startLoadingPartners,
        startAddingPartner,
        startUpdatingPartner,
        startDeletingPartner,
        addingNewActiveLoan,
        multipleAddPartners,
        sortBy
    }
}
