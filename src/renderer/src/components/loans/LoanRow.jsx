import { useMemo } from 'react'
import { getDateFromString, getDueStatus } from '../../helpers'
import { useAuthStore, useLoansStore, useUiStore } from '../../hooks'
import { DeleteButton } from '../commons/buttons/DeleteButton'
import { format, formatDistanceToNowStrict, parseISO } from 'date-fns'
import { es } from 'date-fns/locale'

export const LoanRow = ({ loan, index }) => {
    const { user } = useAuthStore()
    const { returnLoan, startDeletingLoan, renewLoan } = useLoansStore()
    const { openConfirmModal, openPartnerModal, openBookModal, openLoanModal } = useUiStore()

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
            <td className="w-[11%]">
                <div>
                    <div>{format(parseISO(loan.date_start), 'dd/MM/yyyy')}</div>
                    <div className="text-sm">{shortDistance(loan.date_start)}</div>
                </div>
            </td>
            <td className="w-[11%]">
                <div>
                    <div>{format(parseISO(loan.date_end), 'dd/MM/yyyy')}</div>
                    <div className="text-sm">{getDueStatus(loan.date_end)}</div>
                </div>
            </td>
            <td className="w-[30%]">
                <h4
                    onClick={openBookDetails}
                    className="max-w-[410px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
                >
                    #{loan.book_id} - "{loan.title}"
                </h4>
            </td>
            <td className="w-[30%]">
                <h4
                    onClick={openUserDetails}
                    className="max-w-[410px] cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap hover:underline"
                >
                    #{loan.auto_partner_id} - {loan.surname}, {loan.name}
                </h4>
            </td>
            <td className="w-[18%] items-center justify-end text-end">
                {user.sessionToken ? (
                    <div className="flex items-center justify-end gap-2">
                        {loan.returned === 0 ? (
                            <>
                                <button
                                    onClick={() => openLoanModal(loan, 'renew')}
                                    className="rounded-lg bg-white px-4 py-2 font-semibold text-blue_600 shadow-md"
                                >
                                    Renovar
                                </button>

                                <button
                                    onClick={onReturnBook}
                                    className="rounded-lg bg-blue_600 px-4 py-2 text-white shadow-md"
                                >
                                    Devolver
                                </button>
                            </>
                        ) : (
                            <span>Devuelto</span>
                        )}

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
                    </div>
                ) : (
                    <span>---</span>
                )}
            </td>
        </tr>
    )
}
