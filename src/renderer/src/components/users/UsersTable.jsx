import { useAuthStore, usePartnersStore, useUiStore } from '../../hooks'
import infoIcon from '../../assets/images/icons/Info.svg'
import trashIcon from '../../assets/images/icons/Trash.svg'
import { useEffect, useState } from 'react'

export const UsersTable = ({ filter }) => {
    const { user } = useAuthStore()
    const { partners, startDeletingPartner, orderBy, sortBy } = usePartnersStore()
    const [filteredPartners, setFilteredPartners] = useState(partners)
    const { openConfirmModal } = useUiStore()

    useEffect(() => {
        if (filter !== '') {
            setFilteredPartners(
                partners.filter((partner) => {
                    return (
                        partner.name.toLowerCase().includes(filter.toLowerCase()) ||
                        partner.surname.toLowerCase().includes(filter.toLowerCase()) ||
                        partner.type.toLowerCase().includes(filter.toLowerCase())
                    )
                })
            )
        } else {
            setFilteredPartners(partners)
        }
    }, [filter, partners])

    const deletePartner = (id) => {
        startDeletingPartner({ id })
    }

    return (
        <table className="flex h-full w-4/5 flex-col gap-6">
            <thead className="font-supermercado text-xl">
                <tr className="flex items-center rounded-2xl bg-yellow_500 px-6 py-4 text-yellow_600 shadow-md">
                    <td className="flex w-[5%] cursor-pointer items-center">#</td>
                    <td className="flex w-[27%] cursor-pointer items-center">Apellido y Nombre</td>
                    <td className="flex w-[27%] cursor-pointer items-center">Tipo</td>
                    <td className="flex w-[27%] cursor-pointer items-center">Estado</td>
                    <td className="w-[14%] items-center justify-end text-end">Acciones</td>
                </tr>
            </thead>

            <tbody className="flex flex-col gap-6 font-assistant text-lg">
                {filteredPartners.length === 0 ? (
                    filter !== '' ? (
                        <tr className="flex items-center rounded-2xl bg-yellow_400 px-6 py-4 text-yellow_600 shadow-md">
                            <td className="w-full text-center">No hay resultados</td>
                        </tr>
                    ) : (
                        <tr className="flex items-center rounded-2xl bg-yellow_400 px-6 py-4 text-yellow_600 shadow-md">
                            <td className="w-full text-center">No hay usuarios</td>
                        </tr>
                    )
                ) : (
                    <></>
                )}

                {filteredPartners.map((partner, index) => (
                    <tr
                        key={partner.id}
                        className={`${index % 2 === 0 ? 'bg-yellow_400' : 'bg-yellow_500'} flex items-center rounded-2xl bg-yellow_400 px-6 py-4 text-yellow_600 shadow-md`}
                    >
                        <td className="w-[5%]">{partner.id}</td>
                        <td className="w-[27%]">
                            {partner.surname}, {partner.name}
                        </td>
                        <td className="w-[27%]">{partner.type}</td>
                        <td className="w-[27%]">Activo</td>
                        <td className="flex w-[14%] items-center justify-end gap-2 text-end">
                            <button className="cursor-pointer bg-transparent">
                                <img src={infoIcon} alt="See more Icon" />
                            </button>

                            {user.sessionToken && (
                                <>
                                    <button
                                        onClick={() =>
                                            openConfirmModal({
                                                title: '¿Eliminar usuario?',
                                                message: 'Esta acción no se puede deshacer',
                                                onConfirm: () => deletePartner(partner.id)
                                            })
                                        }
                                        className="cursor-pointer bg-transparent"
                                    >
                                        <img src={trashIcon} alt="Delete Icon" />
                                    </button>

                                    <button className="cursor-pointer rounded-lg bg-orange_600 p-2 text-white">
                                        Prestar
                                    </button>
                                </>
                            )}

                            {/* <p className="${!lead ? 'hidden' : ''}">Préstamo</p> */}
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
