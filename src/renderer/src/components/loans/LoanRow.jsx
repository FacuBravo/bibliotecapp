import { useMemo } from 'react'
import { getDateFromString } from '../../helpers'
import { useAuthStore, useLoansStore, useUiStore } from '../../hooks'
import { DeleteButton } from '../commons/buttons/DeleteButton'

export const LoanRow = ({ loan, index }) => {
    const { user } = useAuthStore()
    const { returnLoan, startDeletingLoan } = useLoansStore()

    const { openConfirmModal } = useUiStore()

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

    return (
        <tr className={`${getRowColors()} flex items-center rounded-2xl px-6 py-4 shadow-md`}>
            <td className="w-[13%]">{loan.date_start}</td>
            <td className="w-[13%]">{loan.date_end}</td>
            <td className="w-[33%]">
                <h4 className="max-w-[450px] overflow-hidden text-ellipsis whitespace-nowrap">
                    #{loan.book_id} - "{loan.title}"
                </h4>
            </td>
            <td className="w-[33%]">
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
