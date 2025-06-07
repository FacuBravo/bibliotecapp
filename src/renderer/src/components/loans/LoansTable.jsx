import { useEffect, useState } from 'react'
import { useLoansStore } from '../../hooks'
import { LoanRow } from './LoanRow'
import arrowIcon from '../../assets/images/icons/Arrow.svg'

export const LoansTable = ({ filter = '' }) => {
    const { loans, orderBy, sortBy } = useLoansStore()
    const [filteredLoans, setFilteredLoans] = useState(loans)

    useEffect(() => {
        if (filter !== '') {
            setFilteredLoans(
                loans.filter((loan) => {
                    return (
                        loan.book_id.toString().toLowerCase().includes(filter.toLowerCase()) ||
                        loan.auto_partner_id
                            .toString()
                            .toLowerCase()
                            .includes(filter.toLowerCase()) ||
                        loan.title.toLowerCase().includes(filter.toLowerCase()) ||
                        loan.name.toLowerCase().includes(filter.toLowerCase()) ||
                        loan.surname.toLowerCase().includes(filter.toLowerCase())
                    )
                })
            )
        } else {
            setFilteredLoans(loans)
        }
    }, [filter, loans])

    return (
        <table className="flex h-full w-full flex-col gap-6">
            <thead className="font-supermercado text-xl">
                <tr className="flex items-center rounded-2xl bg-yellow_500 px-6 py-4 text-yellow_600 shadow-md transition-all">
                    <td
                        className="flex w-[13%] cursor-pointer items-center"
                        onClick={() => sortBy('date_start')}
                    >
                        Inicio
                        <img
                            className={
                                (orderBy.field === 'date_start'
                                    ? orderBy.order === 'asc' && 'rotate-180'
                                    : 'hidden') + ' transition-transform'
                            }
                            src={arrowIcon}
                            alt="Arrow Icon"
                        />
                    </td>
                    <td
                        className="flex w-[13%] cursor-pointer items-center"
                        onClick={() => sortBy('date_end')}
                    >
                        Fin
                        <img
                            className={
                                (orderBy.field === 'date_end'
                                    ? orderBy.order === 'asc' && 'rotate-180'
                                    : 'hidden') + ' transition-transform'
                            }
                            src={arrowIcon}
                            alt="Arrow Icon"
                        />
                    </td>
                    <td className="w-[33%]">Libro</td>
                    <td className="w-[33%]">Usuario</td>
                    <td className="w-[8%] items-center justify-end text-end">Acciones</td>
                </tr>
            </thead>

            <tbody className="flex flex-col gap-6 font-assistant text-lg">
                {filteredLoans.length === 0 ? (
                    filter !== '' ? (
                        <tr className="flex items-center rounded-2xl bg-yellow_400 px-6 py-4 text-yellow_600 shadow-md">
                            <td className="w-full text-center">No hay resultados</td>
                        </tr>
                    ) : (
                        <tr className="flex items-center rounded-2xl bg-yellow_400 px-6 py-4 text-yellow_600 shadow-md">
                            <td className="w-full text-center">No hay préstamos</td>
                        </tr>
                    )
                ) : (
                    <></>
                )}

                {filteredLoans.map((loan, index) => (
                    <LoanRow key={loan.id} loan={loan} index={index} />
                ))}
            </tbody>
        </table>
    )
}
