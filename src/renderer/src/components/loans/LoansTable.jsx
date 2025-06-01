export const LoansTable = () => {
    return (
        <table className="flex h-full w-full flex-col gap-6">
            <thead className="font-supermercado text-xl">
                <tr className="flex items-center rounded-2xl bg-yellow_500 px-6 py-4 text-yellow_600 shadow-md transition-all">
                    <td className="w-[23%]">Inicio</td>
                    <td className="w-[23%]">Fin</td>
                    <td className="w-[23%]">Libro</td>
                    <td className="w-[23%]">Usuario</td>
                    <td className="w-[8%] items-center justify-end text-end">Acciones</td>
                </tr>
            </thead>

            <tbody className="flex flex-col gap-6 font-assistant text-lg"></tbody>
        </table>
    )
}
