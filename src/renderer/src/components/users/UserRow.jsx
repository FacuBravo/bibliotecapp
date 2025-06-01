import { Link } from 'react-router-dom'
import infoIcon from '../../assets/images/icons/Info.svg'
import trashIcon from '../../assets/images/icons/Trash.svg'
import { useAuthStore, useLoansStore, usePartnersStore, useUiStore } from '../../hooks'

export const UserRow = ({ partner, index }) => {
    const { user } = useAuthStore()
    const { startDeletingPartner } = usePartnersStore()
    const { openPartnerModal, openConfirmModal } = useUiStore()
    const { setLoanPartner } = useLoansStore()

    const deletePartner = () => {
        startDeletingPartner({ id: partner.id })
    }

    return (
        <tr
            className={`${index % 2 === 0 ? 'bg-yellow_400' : 'bg-yellow_500'} flex items-center rounded-2xl bg-yellow_400 px-6 py-4 text-yellow_600 shadow-md`}
        >
            <td className="w-[5%]">{partner.id}</td>
            <td className="w-[27%]">
                {partner.surname}, {partner.name}
            </td>
            <td className="w-[27%]">{partner.type}</td>
            <td className="w-[27%]">Activo</td>
            <td className="flex w-[14%] items-center justify-end gap-2 text-end">
                <button
                    onClick={() => openPartnerModal(partner)}
                    className="cursor-pointer bg-transparent"
                >
                    <img src={infoIcon} alt="See more Icon" />
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
                            <img src={trashIcon} alt="Delete Icon" />
                        </button>

                        <Link
                            onClick={() => setLoanPartner(partner)}
                            className="cursor-pointer rounded-lg bg-orange_600 p-2 text-white"
                            to="/loans"
                        >
                            Prestar
                        </Link>
                    </>
                )}
            </td>
        </tr>
    )
}
