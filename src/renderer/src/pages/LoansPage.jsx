import { SearchInput, SecondaryButton } from '../components/commons'
import { LoansModal } from '../components/loans/LoansModal'
import { useUiStore } from '../hooks'
import bookGreen from '../assets/images/icons/Book_green.svg'
import loanBlue from '../assets/images/icons/Loan_blue.svg'
import userOrange from '../assets/images/icons/User_orange.svg'

export const LoansPage = () => {
    const { openLoanModal } = useUiStore()

    return (
        <>
            <main className="mt-32 flex flex-col gap-16">
                <div className="absolute -left-48 -top-4 -z-20 h-32 w-[1000px] -rotate-45 bg-blue_400"></div>
                <div className="absolute -left-80 top-80 -z-20 h-32 w-[1200px] -rotate-45 bg-blue_400"></div>

                <section className="flex items-center justify-center gap-8">
                    <article className="flex h-80 w-72 flex-col items-center justify-between rounded-3xl border-4 border-solid border-green_600 bg-green_400 py-10 font-supermercado text-2xl text-green_600 shadow-md">
                        <h2>Cargar Libro</h2>
                        <img src={bookGreen} alt="Book Icon" />
                        <p></p>
                        <SecondaryButton bgColor="bg-green_600" textColor="text-green_400">
                            Cargar
                        </SecondaryButton>
                    </article>

                    <button
                        onClick={openLoanModal}
                        className="cursor-pointer bg-transparent transition-transform hover:scale-110"
                    >
                        <img src={loanBlue} draggable="false" alt="Loan icon" />
                    </button>

                    <article className="flex h-80 w-72 flex-col items-center justify-between rounded-3xl border-4 border-solid border-orange_600 bg-yellow_400 py-10 font-supermercado text-2xl text-orange_600 shadow-md">
                        <h2>Cargar Usuario</h2>
                        <img src={userOrange} alt="User Icon" />
                        <p id="info_user"></p>
                        <SecondaryButton bgColor="bg-orange_600" textColor="text-yellow_400">
                            Cargar
                        </SecondaryButton>
                    </article>
                </section>

                <section className="mx-auto flex w-4/5 flex-col">
                    <section className="flex h-[82px] w-full justify-between pb-4 pt-6">
                        <div className="flex w-fit items-center gap-1 font-supermercado text-2xl text-pink_600">
                            <h1>Préstamos</h1>
                        </div>
                        <SearchInput />
                    </section>

                    <table className="flex h-full w-full flex-col gap-6">
                        <thead className="font-supermercado text-xl">
                            <tr className="flex items-center rounded-2xl bg-yellow_500 px-6 py-4 text-yellow_600 shadow-md transition-all">
                                <td className="w-[23%]">Inicio</td>
                                <td className="w-[23%]">Fin</td>
                                <td className="w-[23%]">Libro</td>
                                <td className="w-[23%]">Usuario</td>
                                <td className="w-[8%] items-center justify-end text-end">
                                    Acciones
                                </td>
                            </tr>
                        </thead>

                        <tbody className="flex flex-col gap-6 font-assistant text-lg"></tbody>
                    </table>
                </section>
            </main>

            <LoansModal />
        </>
    )
}
