import { useState } from 'react'
import { Link } from 'react-router-dom'

import burgerIcon from '../../assets/images/icons/Burger.svg'
import homeIcon from '../../assets/images/icons/Home.svg'
import userIcon from '../../assets/images/icons/User.svg'
import bookIcon from '../../assets/images/icons/Book.svg'
import loanIcon from '../../assets/images/icons/Loan.svg'
import reportIcon from '../../assets/images/icons/Report.svg'
import { useAuthStore, useUiStore } from '../../hooks'

export const Header = () => {
    const { status, startLogout } = useAuthStore()
    const { openLoginModal, openRegisterModal } = useUiStore()

    const [showMainNav, setShowMainNav] = useState(false)
    const [showUserNav, setShowUserNav] = useState(false)

    const toggleMainNav = () => setShowMainNav(!showMainNav)

    const toggleUserNav = () => setShowUserNav(!showUserNav)

    const closeAll = () => {
        setShowMainNav(false)
        setShowUserNav(false)
    }

    return (
        <header className="z-30 flex h-[98px] w-full justify-between border-b-[3px] border-solid border-green_600 bg-green_400 px-8 py-6">
            <button onClick={toggleMainNav} className="transition-transform hover:scale-110">
                <img src={burgerIcon} alt="Burger Menu Icon" />
            </button>

            <nav
                className={`${!showMainNav && 'hidden'} absolute left-0 top-[98px] z-20 overflow-hidden rounded-br-3xl border-b-[3px] border-r-[3px] border-solid border-green_600 bg-green_400 px-6 py-4 pl-6 transition-opacity`}
            >
                <ul className="flex list-none flex-col gap-4">
                    <li>
                        <Link
                            onClick={closeAll}
                            className="flex items-center gap-3 bg-transparent font-supermercado text-xl text-yellow_600 decoration-0"
                            to="/"
                        >
                            <img src={homeIcon} alt="Home Icon" />
                            Home
                        </Link>
                    </li>

                    <li>
                        <span className="block h-[2px] w-full bg-green_600"></span>
                    </li>

                    <li>
                        <Link
                            onClick={closeAll}
                            className="flex items-center gap-3 bg-transparent font-supermercado text-xl text-blue_600 decoration-0"
                            to="/users"
                        >
                            <img src={userIcon} alt="User Icon" />
                            Usuarios
                        </Link>
                    </li>

                    <li>
                        <Link
                            onClick={closeAll}
                            className="flex items-center gap-3 bg-transparent font-supermercado text-xl text-pink_500 decoration-0"
                            to="/catalog"
                        >
                            <img src={bookIcon} alt="Book Icon" />
                            Catálogo
                        </Link>
                    </li>

                    <li>
                        <Link
                            onClick={closeAll}
                            className="flex items-center gap-3 bg-transparent font-supermercado text-xl text-orange_600 decoration-0"
                            to="/loans"
                        >
                            <img src={loanIcon} alt="Loan Icon" />
                            Préstamos
                        </Link>
                    </li>

                    <li>
                        <span className="block h-[2px] w-full bg-green_600"></span>
                    </li>

                    <li>
                        <Link
                            onClick={closeAll}
                            className="flex items-center gap-3 bg-transparent font-supermercado text-xl text-green_600 decoration-0"
                            to="/reports"
                        >
                            <img src={reportIcon} alt="Report Icon" />
                            Reportes
                        </Link>
                    </li>
                </ul>
            </nav>

            <h1 className="font-supermercado text-2xl text-blue_600">BibliotecApp</h1>

            <button onClick={toggleUserNav} className="transition-transform hover:scale-110">
                <img src={userIcon} alt="User Menu Icon" />
            </button>

            <nav
                className={`${!showUserNav && 'hidden'} absolute right-0 top-[98px] z-20 overflow-hidden rounded-bl-3xl border-0 border-b-[3px] border-l-[3px] border-solid border-green_600 bg-green_400 px-6 py-4 transition-opacity`}
            >
                <ul className="flex list-none flex-col gap-4">
                    {status === 'authenticated' ? (
                        <li>
                            <button
                                onClick={() => {
                                    startLogout()
                                    closeAll()
                                }}
                                className="font-supermercado text-xl text-blue_600"
                            >
                                Cerrar Sesión
                            </button>
                        </li>
                    ) : (
                        <>
                            <li>
                                <button
                                    onClick={() => {
                                        closeAll()
                                        openRegisterModal()
                                    }}
                                    className="font-supermercado text-xl text-blue_600"
                                >
                                    Registro
                                </button>
                            </li>
                            <li>
                                <button
                                    onClick={() => {
                                        closeAll()
                                        openLoginModal()
                                    }}
                                    className="font-supermercado text-xl text-blue_600"
                                >
                                    Iniciar Sesión
                                </button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>

            {showMainNav || showUserNav ? (
                <div
                    onClick={closeAll}
                    className="fixed left-0 top-0 z-10 h-full w-full bg-transparent"
                ></div>
            ) : null}
        </header>
    )
}
