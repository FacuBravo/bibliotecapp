import Modal from 'react-modal'
import { format, addHours } from 'date-fns'

import { useForm, useLoansStore, useUiStore } from '../../hooks'
import { CloseButton, PrimaryButton, PrimaryInput } from '../commons'
import handIcon from '../../assets/images/icons/Hand.svg'
import bookGreen from '../../assets/images/icons/Book_green.svg'
import { useState } from 'react'

Modal.setAppElement('#root')

const initialForm = { date_end: '' }
const formValidations = {
    date_end: [(value) => value.length > 0, 'El nombre de usuario es requerido']
}

export const LoanModal = () => {
    const { isLoanModalOpen, closeLoanModal } = useUiStore()
    const { date_end, onInputChange } = useForm(initialForm, formValidations)
    const { startAddingLoan, book, partner } = useLoansStore()
    const [showAnimation, setShowAnimation] = useState(false)

    const onSubmit = (event) => {
        event.preventDefault()

        const dateStart = format(new Date(), 'dd/MM/yyyy')
        const date = addHours(new Date(date_end), 3)
        const dateEnd = format(date, 'dd/MM/yyyy')

        setShowAnimation(true)

        startAddingLoan({
            date_start: dateStart,
            date_end: dateEnd,
            book_id: book.inventory,
            partner_id: partner.id_card
        })
    }

    return (
        <Modal
            className={`${showAnimation ? 'min-h-[300px] min-w-[400px]' : 'min-h-[100px] min-w-[100px]'} absolute bottom-auto left-1/2 right-auto top-1/2 z-50 -mr-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white p-4 shadow-lg transition-all duration-500`}
            overlayClassName="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/30"
            isOpen={isLoanModalOpen}
            onRequestClose={() => {
                setShowAnimation(false)
                closeLoanModal()
            }}
        >
            <section className="flex flex-col items-end">
                <CloseButton
                    close={() => {
                        setShowAnimation(false)
                        closeLoanModal()
                    }}
                />

                <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-12 px-6">
                    <div className="primary_input">
                        <PrimaryInput
                            name={'date_end'}
                            label={'Fin de préstamo'}
                            isRequired={true}
                            onInputChange={onInputChange}
                            value={date_end}
                            type="date"
                        />

                        <div className="input_background"></div>
                    </div>

                    <PrimaryButton>Prestar</PrimaryButton>
                </form>
            </section>

            <article
                className={`${showAnimation ? 'top-0' : 'top-full'} absolute left-0 z-10 flex h-full w-full flex-col items-center bg-yellow_400 pt-[12%] transition-all duration-500`}
            >
                <img
                    className={`${showAnimation && 'loan-book-animation'} w-[100px] -translate-x-[70px] translate-y-[10px]`}
                    src={bookGreen}
                    alt="Book Icon"
                />

                <div className="flex gap-20">
                    <img className="w-[100px] -scale-x-[1]" src={handIcon} alt="Left hand Icon" />
                    <img className="w-[100px]" src={handIcon} alt="Right hand Icon" />
                </div>
            </article>
        </Modal>
    )
}
