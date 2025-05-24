import Modal from 'react-modal'

import { useForm, useUiStore } from '../../hooks'
import { PrimaryButton } from '../commons'

Modal.setAppElement('#root')

const initialForm = { date_end: '' }
const formValidations = {
    date_end: [(value) => value.length > 0, 'El nombre de usuario es requerido']
}

export const LoansModal = () => {
    const { isLoanModalOpen, closeLoanModal } = useUiStore()
    const { date_end, onInputChange } = useForm(initialForm, formValidations)

    const onSubmit = (event) => {
        event.preventDefault()
        // TODO: loan
        console.log({ date_end })
    }

    return (
        <Modal
            id="loan_dialog"
            className="modal"
            overlayClassName="modal__backdrop"
            isOpen={isLoanModalOpen}
            onRequestClose={closeLoanModal}
        >
            <section className="modal-content">
                <button onClick={closeLoanModal} className="modal-content__close">
                    <svg
                        id="close_loan_dialog_btn"
                        width="32"
                        height="32"
                        viewBox="0 0 32 32"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            d="M14.6667 22.6667H17.3333V17.3334H22.6667V14.6667H17.3333V9.33335H14.6667V14.6667H9.33334V17.3334H14.6667V22.6667ZM16 29.3334C14.1556 29.3334 12.4222 28.9834 10.8 28.2834C9.17778 27.5834 7.76667 26.6334 6.56667 25.4334C5.36667 24.2334 4.41667 22.8222 3.71667 21.2C3.01667 19.5778 2.66667 17.8445 2.66667 16C2.66667 14.1556 3.01667 12.4222 3.71667 10.8C4.41667 9.1778 5.36667 7.76669 6.56667 6.56669C7.76667 5.36669 9.17778 4.41669 10.8 3.71669C12.4222 3.01669 14.1556 2.66669 16 2.66669C17.8444 2.66669 19.5778 3.01669 21.2 3.71669C22.8222 4.41669 24.2333 5.36669 25.4333 6.56669C26.6333 7.76669 27.5833 9.1778 28.2833 10.8C28.9833 12.4222 29.3333 14.1556 29.3333 16C29.3333 17.8445 28.9833 19.5778 28.2833 21.2C27.5833 22.8222 26.6333 24.2334 25.4333 25.4334C24.2333 26.6334 22.8222 27.5834 21.2 28.2834C19.5778 28.9834 17.8444 29.3334 16 29.3334ZM16 26.6667C18.9778 26.6667 21.5 25.6334 23.5667 23.5667C25.6333 21.5 26.6667 18.9778 26.6667 16C26.6667 13.0222 25.6333 10.5 23.5667 8.43335C21.5 6.36669 18.9778 5.33335 16 5.33335C13.0222 5.33335 10.5 6.36669 8.43334 8.43335C6.36667 10.5 5.33334 13.0222 5.33334 16C5.33334 18.9778 6.36667 21.5 8.43334 23.5667C10.5 25.6334 13.0222 26.6667 16 26.6667Z"
                            fill="#60A4D3"
                        />
                    </svg>
                </button>

                <form onSubmit={onSubmit}>
                    <div className="primary_input">
                        <input
                            type="date"
                            name="date_end"
                            value={date_end}
                            onChange={onInputChange}
                            required
                        />
                        <span>Fin de préstamo</span>
                        <div className="input_background"></div>
                    </div>

                    <PrimaryButton>Prestar</PrimaryButton>
                </form>
            </section>

            <article className="animation_container" id="loan_animation">
                <img id="loan_book" src="assets/images/icons/Book_green.svg" alt="" />
                <div>
                    <img id="left_hand" src="assets/images/icons/Hand.svg" alt="" />
                    <img id="right_hand" src="assets/images/icons/Hand.svg" alt="" />
                </div>
            </article>
        </Modal>
    )
}
