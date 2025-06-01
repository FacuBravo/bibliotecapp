import { SearchInput } from '../components/commons'
import { LoanModal, LoansTable } from '../components/loans'
import { useLoansStore, useUiStore } from '../hooks'
import bookGreen from '../assets/images/icons/Book_green.svg'
import loanBlue from '../assets/images/icons/Loan_blue.svg'
import userOrange from '../assets/images/icons/User_orange.svg'
import { Link } from 'react-router-dom'

export const LoansPage = () => {
    const { openLoanModal } = useUiStore()
    const { partner, book } = useLoansStore()

    return (
        <>
            <main className="mt-32 flex min-h-[calc(100vh-98px)] w-full flex-col gap-16 p-8 pt-0">
                <div className="absolute -left-48 -top-4 -z-20 h-32 w-[1000px] -rotate-45 bg-blue_400"></div>
                <div className="absolute -left-80 top-80 -z-20 h-32 w-[1200px] -rotate-45 bg-blue_400"></div>

                <section className="flex items-center justify-center gap-8">
                    <article className="flex h-80 w-72 flex-col items-center justify-between rounded-3xl border-4 border-solid border-green_600 bg-green_400 py-10 font-supermercado text-2xl text-green_600 shadow-md">
                        <h2>Cargar Libro</h2>
                        <img src={bookGreen} alt="Book Icon" />
                        {book !== null && (
                            <p className="w-64 overflow-hidden text-ellipsis whitespace-nowrap text-center font-assistant">
                                {book.title}
                            </p>
                        )}
                        <Link
                            to="/catalog"
                            className="flex h-12 w-32 items-center justify-center rounded-lg bg-green_600 font-barrio text-2xl text-green_400 decoration-0 shadow-md"
                        >
                            Cargar
                        </Link>
                    </article>

                    <button
                        disabled={partner === null || book === null}
                        onClick={openLoanModal}
                        className="cursor-pointer bg-transparent transition-transform hover:scale-110 disabled:cursor-not-allowed"
                    >
                        <img src={loanBlue} draggable="false" alt="Loan icon" />
                    </button>

                    <article className="flex h-80 w-72 flex-col items-center justify-between rounded-3xl border-4 border-solid border-orange_600 bg-yellow_400 py-10 font-supermercado text-2xl text-orange_600 shadow-md">
                        <h2>Cargar Usuario</h2>
                        <img src={userOrange} alt="User Icon" />
                        {partner !== null && (
                            <p className="w-64 overflow-hidden text-ellipsis whitespace-nowrap text-center font-assistant">
                                {partner.surname + ', ' + partner.name}
                            </p>
                        )}
                        <Link
                            to="/users"
                            className="flex h-12 w-32 items-center justify-center rounded-lg bg-orange_600 font-barrio text-2xl text-yellow_400 decoration-0 shadow-md"
                        >
                            Cargar
                        </Link>
                    </article>
                </section>

                <section className="mx-auto flex w-4/5 flex-col">
                    <section className="flex h-[82px] w-full justify-between pb-4 pt-6">
                        <div className="flex w-fit items-center gap-1 font-supermercado text-2xl text-pink_600">
                            <h1>Préstamos</h1>
                        </div>

                        <SearchInput />
                    </section>

                    <LoansTable />
                </section>
            </main>

            <LoanModal />
        </>
    )
}
