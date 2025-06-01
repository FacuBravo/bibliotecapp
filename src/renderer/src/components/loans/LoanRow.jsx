import { useAuthStore } from '../../hooks'

export const LoanRow = ({ loan, index }) => {
    const { user } = useAuthStore()

    return (
        <tr
            className={`${loan.date_end > new Date().toISOString() ? 'bg-red text-white' : index % 2 === 0 ? 'bg-yellow_400 text-yellow_600' : 'bg-yellow_500 text-yellow_600'} flex items-center rounded-2xl px-6 py-4 shadow-md`}
        >
            <td className="w-[13%]">{loan.date_start}</td>
            <td className="w-[13%]">{loan.date_end}</td>
            <td className="w-[33%]">
                <h4 className="w-[450px] overflow-hidden text-ellipsis whitespace-nowrap">
                    #{loan.book_id} - "{loan.title}"
                </h4>
            </td>
            <td className="w-[33%]">
                <h4 className="w-[450px] overflow-hidden text-ellipsis whitespace-nowrap">
                    #{loan.auto_partner_id} - {loan.name}
                </h4>
            </td>
            <td className="w-[8%] items-center justify-end text-end">
                {user.sessionToken && (
                    <>
                        {loan.returned === 1 ? (
                            <span>---</span>
                        ) : (
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
