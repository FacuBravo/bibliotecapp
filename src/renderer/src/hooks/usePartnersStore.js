import { useDispatch, useSelector } from 'react-redux'
import {
    addPartner,
    deletePartner,
    setPartners,
    setLoading,
    setNotLoading,
    updatePartner
} from '../store/partners/partnersSlice'
import { useState } from 'react'

const validFields = ['id', 'name', 'type', 'state']

export const usePartnersStore = () => {
    const dispatch = useDispatch()
    const { partners, isLoading, error, counter } = useSelector((state) => state.partners)
    const { user } = useSelector((state) => state.auth)
    const [orderBy, setOrderBy] = useState({
        field: 'id',
        order: 'desc'
    })

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

            dispatch(addPartner({ partner: response.partner }))
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

            dispatch(updatePartner({ partner: response.partner }))
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
            return true
        } catch (error) {
            console.error('Error deleting partner:', error)
            dispatch(setNotLoading({ error: 'Error al eliminar el libro' }))
            return false
        }
    }

    const multipleAddPartners = async (partners) => {
        const isPartnersArray = checkIfIsPartnersArray(partners)

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
                partners,
                user.sessionToken
            )

            if (!response.ok) throw new Error(response.msg || 'Failed to add partners')

            dispatch(setPartners({ partners: response.partners }))

            return true
        } catch (error) {
            console.error('Error adding partners:', error)
            dispatch(setNotLoading({ error: 'Error al agregar los libros' }))
            return false
        }
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

        setOrderBy({
            field,
            order: orderBy.field === field ? (orderBy.order === 'asc' ? 'desc' : 'asc') : 'asc'
        })

        const sortedPartners = [...partners].sort((a, b) => {
            if (a[field] < b[field]) return orderBy.order === 'asc' ? -1 : 1
            if (a[field] > b[field]) return orderBy.order === 'asc' ? 1 : -1
            return 0
        })

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
        multipleAddPartners,
        sortBy
    }
}
