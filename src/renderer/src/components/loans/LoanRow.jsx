import { useMemo } from 'react'
import { getDateFromString, getDueStatus } from '../../helpers'
import { useAuthStore, useLoansStore, useUiStore } from '../../hooks'
import { DeleteButton } from '../commons/buttons/DeleteButton'
import { format, isAfter, formatDistanceToNowStrict, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const LoanRow = ({ loan, index }) => {
    const { user } = useAuthStore()
    const { returnLoan, startDeletingLoan } = useLoansStore()

    const { openConfirmModal, openPartnerModal, openBookModal } = useUiStore()

    const isInDebt = useMemo(
        () => getDateFromString(loan.date_end) < new Date(new Date().setHours(0, 0, 0, 0)),
        [loan.date_end]
    )

    const getRowColors = () => {
        return isInDebt && loan.returned === 0
            ? 'bg-red text-white'
            : index % 2 === 0
              ? 'bg-yellow_400 text-yellow_600'
              : 'bg-yellow_500 text-yellow_600'
    }

    const onReturnBook = () => {
        if (!user || !user.sessionToken) return

        if (loan.returned === 0) {
            returnLoan({ id: loan.id, book_id: loan.auto_book_id })
        }
    }

    const deleteLoan = () => {
        startDeletingLoan({ id: loan.id })
    }

    const openUserDetails = async () => {
        const response = await window.partnersApi.getPartner(loan.auto_partner_id)

        if (response.ok) {
            openPartnerModal(response.partner)
        }
    }

    const openBookDetails = async () => {
        const response = await window.booksApi.getBook(loan.auto_book_id)

        if (response.ok) {
            openBookModal(response.book)
        }
    }

    const shortDistance = (date) => {
        const distance = formatDistanceToNowStrict(parseISO(date), {
            locale: es
        })
            .replace('horas', 'hs')
            .replace('hora', 'h')
            .replace('minutos', 'min')
            .replace('minuto', 'min')
            .replace('días', 'd')
            .replace('día', 'd')

        if (distance.includes('h')) {
            return 'Hoy'
        }

        return `Hace ${distance}`
    }

    return (
        <tr className={`${getRowColors()} flex items-center rounded-2xl px-6 py-4 shadow-md`}>
            <td className="w-[13%]">
                <div>
                    <div>{format(parseISO(loan.date_start), 'dd/MM/yyyy')}</div>
                    <div className="text-sm">{shortDistance(loan.date_start)}</div>
                </div>
            </td>
            <td className="w-[13%]">
                <div>
                    <div>{format(parseISO(loan.date_end), 'dd/MM/yyyy')}</div>
                    <div className="text-sm">{getDueStatus(loan.date_end)}</div>
                </div>
            </td>
            <td onClick={openBookDetails} className="w-[33%] cursor-pointer">
                <h4 className="max-w-[450px] overflow-hidden text-ellipsis whitespace-nowrap">
                    #{loan.book_id} - "{loan.title}"
                </h4>
            </td>
            <td onClick={openUserDetails} className="w-[33%] cursor-pointer">
                <h4 className="max-w-[450px] overflow-hidden text-ellipsis whitespace-nowrap">
                    #{loan.auto_partner_id} - {loan.surname}, {loan.name}
                </h4>
            </td>
            <td className="w-[8%] items-center justify-end text-end">
                {user.sessionToken ? (
                    <div className="flex items-center justify-end gap-2">
                        <DeleteButton
                            action={() =>
                                openConfirmModal({
                                    title: '¿Eliminar prestamo?',
                                    message: 'Esta acción no se puede deshacer',
                                    onConfirm: deleteLoan
                                })
                            }
                            white={isInDebt && loan.returned === 0}
                        />

                        {loan.returned === 0 ? (
                            <button
                                onClick={onReturnBook}
                                className="rounded-lg bg-blue_600 p-2 text-white"
                            >
                                Devolver
                            </button>
                        ) : (
                            <span>Devuelto</span>
                        )}
                    </div>
                ) : (
                    <span>---</span>
                )}
            </td>
        </tr>
    )
}
