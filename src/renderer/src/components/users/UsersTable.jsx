import { useAuthStore } from '../../hooks'
import infoIcon from '../../assets/images/icons/Info.svg'
import trashIcon from '../../assets/images/icons/Trash.svg'

export const UsersTable = ({ filter }) => {
    const { user } = useAuthStore()

    return (
        <table className="flex h-full w-4/5 flex-col gap-6">
            <thead className="font-supermercado text-xl">
                <tr className="flex items-center rounded-2xl bg-yellow_500 px-6 py-4 text-yellow_600 shadow-md transition-all">
                    <td className="flex w-[5%] cursor-pointer items-center">#</td>
                    <td className="flex w-[27%] cursor-pointer items-center">Apellido y Nombre</td>
                    <td className="flex w-[27%] cursor-pointer items-center">Tipo</td>
                    <td className="flex w-[27%] cursor-pointer items-center">Estado</td>
                    <td className="w-[14%] items-center justify-end text-end">Acciones</td>
                </tr>
            </thead>

            <tbody className="flex flex-col gap-6 font-assistant text-lg">
                <tr className="flex items-center rounded-2xl bg-yellow_400 px-6 py-4 text-yellow_600 shadow-md transition-all">
                    <td className="w-[5%]">1</td>
                    <td className="w-[27%]">Bravo, Facundo</td>
                    <td className="w-[27%]">Alumno</td>
                    <td className="w-[27%]">Activo</td>
                    <td className="flex w-[14%] items-center justify-end gap-2 text-end">
                        <button className="cursor-pointer bg-transparent">
                            <img src={infoIcon} alt="See more Icon" />
                        </button>
                        <button className="cursor-pointer bg-transparent">
                            <img src={trashIcon} alt="Delete Icon" />
                        </button>
                        <button className="cursor-pointer rounded-lg bg-orange_600 p-2 text-white">
                            Prestar
                        </button>
                        {/* <p className="${!lead ? 'hidden' : ''}">Préstamo</p> */}
                    </td>
                </tr>
            </tbody>
        </table>
    )
}
