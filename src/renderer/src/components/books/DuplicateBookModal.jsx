import Modal from 'react-modal'

import { useBooksStore, useForm, useUiStore } from '../../hooks'
import { CloseButton, PrimaryButton, SecondaryInput } from '../commons'
import { useEffect } from 'react'

const duplicateBookForm = {
    inventory: ''
}

const formValidations = {
    inventory: [(value) => value.length > 0, 'El numero de inventario es requerido']
}

export const DuplicateBookModal = () => {
    const { isDuplicateBookModalOpen, closeDuplicateBookModal, duplicateBook } = useUiStore()
    const { startAddingBook } = useBooksStore()

    const { inventory, onInputChange, isFormValid, onResetForm } = useForm(
        duplicateBookForm,
        formValidations
    )

    const onSubmit = async (event) => {
        event.preventDefault()

        if (!isFormValid || !duplicateBook) return

        const res = await startAddingBook({
            inventory,
            title: duplicateBook.title,
            author: duplicateBook.author,
            edition: duplicateBook.edition,
            place: duplicateBook.place,
            editorial: duplicateBook.editorial,
            year: duplicateBook.year,
            theme: duplicateBook.theme,
            collection: duplicateBook.collection
        })

        if (!!res) {
            onResetForm()
            closeDuplicateBookModal()
        }
    }

    return (
        <Modal
            className="absolute bottom-auto left-1/2 right-auto top-1/2 z-50 -mr-[50%] min-w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-4 shadow-lg"
            overlayClassName="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/30"
            isOpen={isDuplicateBookModalOpen}
            onRequestClose={closeDuplicateBookModal}
        >
            <section className="flex flex-col items-end">
                <CloseButton close={closeDuplicateBookModal} />

                <div className="my-4 mt-2 flex w-full flex-col items-center gap-4 px-6 text-center">
                    <h3 className="font-supermercado text-3xl font-bold text-blue_600">
                        Duplicar libro:
                    </h3>
                    <h4 className="font-assistant text-xl text-blue_600">{duplicateBook?.title}</h4>
                </div>

                <form onSubmit={onSubmit} className="mt-4 flex w-full flex-col gap-12 px-6">
                    <SecondaryInput
                        name="inventory"
                        placeholder="#"
                        isRequired
                        onInputChange={onInputChange}
                        value={inventory}
                        type="number"
                        label="Número de inventario"
                    />

                    <PrimaryButton disabled={!isFormValid}>Cargar</PrimaryButton>
                </form>

                <p className="mx-auto mt-4 font-assistant text-blue_600"></p>
            </section>
        </Modal>
    )
}
