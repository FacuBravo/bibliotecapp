import { getDateFromString } from '../../helpers'
import { useAuthStore } from '../../hooks'

export const LoanRow = ({ loan, index }) => {
    const { user } = useAuthStore()

    const getRowColors = () => {
        return getDateFromString(loan.date_end) < new Date() && loan.returned === 0
            ? 'bg-red text-white'
            : index % 2 === 0
              ? 'bg-yellow_400 text-yellow_600'
              : 'bg-yellow_500 text-yellow_600'
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
                {loan.returned === 1 || !user.sessionToken ? (
                    <span>---</span>
                ) : (
                    <>
                        {user.sessionToken && (
                            <button className="rounded-lg bg-blue_600 p-2 text-white">
                                Devolver
                            </button>
                        )}
                    </>
                )}
            </td>
        </tr>
    )
}
