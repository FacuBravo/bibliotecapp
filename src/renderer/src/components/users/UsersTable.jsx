import { useEffect } from 'react'

import { usePartnersStore } from '../../hooks'
import { UserRow } from './UserRow'
import arrowIcon from '../../assets/images/icons/Arrow.svg'
import { PartnerModal } from './'

export const UsersTable = ({ filter = '' }) => {
    const { partners, orderBy, sortBy, startLoadingPartners } = usePartnersStore()

    useEffect(() => {
        if (filter !== '') {
            startLoadingPartners(0, orderBy, filter)
        } else {
            startLoadingPartners(0, orderBy)
        }
    }, [filter])

    return (
        <>
            <table className="flex h-full w-full flex-col gap-6 lg:w-4/5">
                <thead className="font-supermercado text-xl">
                    <tr className="flex items-center rounded-2xl bg-yellow_500 px-6 py-4 text-yellow_600 shadow-md">
                        <td
                            onClick={() => sortBy('id')}
                            className="flex w-[5%] cursor-pointer items-center"
                        >
                            #
                            <img
                                className={
                                    (orderBy.field === 'id'
                                        ? orderBy.order === 'asc' && 'rotate-180'
                                        : 'hidden') + ' transition-transform'
                                }
                                src={arrowIcon}
                                alt="Arrow Icon"
                            />
                        </td>
                        <td
                            onClick={() => sortBy('surname')}
                            className="flex w-[27%] cursor-pointer items-center"
                        >
                            Apellido y Nombre
                            <img
                                className={
                                    (orderBy.field === 'surname'
                                        ? orderBy.order === 'asc' && 'rotate-180'
                                        : 'hidden') + ' transition-transform'
                                }
                                src={arrowIcon}
                                alt="Arrow Icon"
                            />
                        </td>
                        <td
                            onClick={() => sortBy('type')}
                            className="flex w-[27%] cursor-pointer items-center"
                        >
                            Tipo
                            <img
                                className={
                                    (orderBy.field === 'type'
                                        ? orderBy.order === 'asc' && 'rotate-180'
                                        : 'hidden') + ' transition-transform'
                                }
                                src={arrowIcon}
                                alt="Arrow Icon"
                            />
                        </td>
                        <td className="w-[27%]">Grado</td>
                        <td className="w-[27%]">Estado</td>
                        <td className="w-[14%] items-center justify-end text-end">Acciones</td>
                    </tr>
                </thead>

                <tbody className="flex flex-col gap-6 font-assistant text-lg">
                    {partners.length === 0 ? (
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

                    {partners.map((partner, index) => (
                        <UserRow key={partner.id} partner={partner} index={index} />
                    ))}
                </tbody>
            </table>

            <PartnerModal />
        </>
    )
}
