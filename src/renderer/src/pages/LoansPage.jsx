import { SecondaryButton } from '../components/commons'
import { LoansModal } from '../components/loans/LoansModal'
import { useUiStore } from '../hooks'
import bookGreen from '../assets/images/icons/Book_green.svg'
import loanBlue from '../assets/images/icons/Loan_blue.svg'
import userOrange from '../assets/images/icons/User_orange.svg'
import lens from '../assets/images/icons/Lens.svg'

export const LoansPage = () => {
    const { openLoanModal } = useUiStore()

    return (
        <>
            <main className="main--loans">
                <div className="background_item"></div>
                <div className="background_item"></div>

                <section className="charge_section">
                    <article className="charge_book charge_card" id="charge_book_container">
                        <h2>Cargar Libro</h2>
                        <img src={bookGreen} alt="Book Icon" />
                        <p id="info_book"></p>
                        <SecondaryButton>Cargar</SecondaryButton>
                    </article>

                    <button onClick={openLoanModal} className="btn_lend_book" id="btn_lend_book">
                        <img src={loanBlue} draggable="false" alt="Loan icon" />
                    </button>

                    <article className="charge_user charge_card" id="charge_user_container">
                        <h2>Cargar Usuario</h2>
                        <img src={userOrange} alt="User Icon" />
                        <p id="info_user"></p>
                        <SecondaryButton>Cargar</SecondaryButton>
                    </article>
                </section>

                <section className="table_section">
                    <section className="top_info">
                        <div className="section_title_container">
                            <h1>Préstamos</h1>
                        </div>
                        <div className="searcher">
                            <input type="text" name="searcher_input" placeholder="Buscar..." />
                            <img src={lens} alt="Lens Icon" />
                        </div>
                    </section>

                    <table className="loans_table">
                        <thead>
                            <tr>
                                <td>Inicio</td>
                                <td>Fin</td>
                                <td>Libro</td>
                                <td>Usuario</td>
                                <td>Acciones</td>
                            </tr>
                        </thead>
                        <tbody id="table_body"></tbody>
                    </table>
                </section>
            </main>

            <LoansModal />
        </>
    )
}
