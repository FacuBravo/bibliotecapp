import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import infoIcon from '../../assets/images/icons/Info.svg'
import infoWhiteIcon from '../../assets/images/icons/Info_white.svg'
import trashIcon from '../../assets/images/icons/Trash.svg'
import trashWhiteIcon from '../../assets/images/icons/Trash_white.svg'
import { useAuthStore, useLoansStore, usePartnersStore, useUiStore } from '../../hooks'
import { getDateFromString } from '../../helpers'

export const UserRow = ({ partner, index }) => {
    const { user } = useAuthStore()
    const { startDeletingPartner } = usePartnersStore()
    const { openPartnerModal, openConfirmModal } = useUiStore()
    const { setLoanPartner } = useLoansStore()

    const isInDebt = useMemo(() => {
        const activeLoansDates = partner.active_loans && partner.active_loans.split(',')
        if (!activeLoansDates || activeLoansDates.length === 0) return false

        for (const activeLoan of activeLoansDates) {
            if (getDateFromString(activeLoan) < new Date(new Date().setHours(0, 0, 0, 0))) {
                return true
            }
        }

        return false
    }, [partner.active_loans])

    const deletePartner = () => {
        startDeletingPartner({ id: partner.id })
    }

    const getRowColors = () => {
        return isInDebt
            ? 'bg-red text-white'
            : index % 2 === 0
              ? 'bg-yellow_400 text-yellow_600'
              : 'bg-yellow_500 text-yellow_600'
    }

    return (
        <tr className={`${getRowColors()} flex items-center rounded-2xl px-6 py-4 shadow-md`}>
            <td className="w-[5%]">{partner.id}</td>
            <td className="w-[27%]">
                {partner.surname}, {partner.name}
            </td>
            <td className="w-[27%]">{partner.type}</td>
            <td className="w-[27%]">{isInDebt ? 'En deuda' : 'Al día'}</td>
            <td className="flex w-[14%] items-center justify-end gap-2 text-end">
                <button
                    onClick={() => openPartnerModal(partner)}
                    className="cursor-pointer bg-transparent"
                >
                    <img
                        className="min-h-8 min-w-8"
                        src={isInDebt ? infoWhiteIcon : infoIcon}
                        alt="See more Icon"
                    />
                </button>

                {user.sessionToken && (
                    <>
                        <button
                            onClick={() =>
                                openConfirmModal({
                                    title: '¿Eliminar usuario?',
                                    message: 'Esta acción no se puede deshacer',
                                    onConfirm: deletePartner
                                })
                            }
                            className="cursor-pointer bg-transparent"
                        >
                            <img
                                className="min-h-8 min-w-8"
                                src={isInDebt ? trashWhiteIcon : trashIcon}
                                alt="Delete Icon"
                            />
                        </button>

                        {partner.active_loans === null ||
                        partner.type.toLowerCase() === 'docente' ? (
                            <Link
                                onClick={() => setLoanPartner(partner)}
                                className={`${isInDebt ? 'bg-white font-bold text-red' : 'bg-orange_600 text-white'} cursor-pointer rounded-lg p-2`}
                                to="/loans"
                            >
                                Prestar
                            </Link>
                        ) : (
                            <p>Préstamo</p>
                        )}
                    </>
                )}
            </td>
        </tr>
    )
}
