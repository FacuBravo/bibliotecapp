import Modal from 'react-modal'

import { useForm, useUiStore } from '../../hooks'
import { CloseButton, PrimaryButton, PrimaryInput } from '../commons'

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
            className="absolute bottom-auto left-1/2 right-auto top-1/2 z-50 -mr-[50%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-4 shadow-lg"
            overlayClassName="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/30"
            isOpen={isLoanModalOpen}
            onRequestClose={closeLoanModal}
        >
            <section className="flex flex-col items-end">
                <CloseButton close={closeLoanModal} />

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
