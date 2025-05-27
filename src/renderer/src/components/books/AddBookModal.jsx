import Modal from 'react-modal'

import { useBooksStore, useForm, useUiStore } from '../../hooks'
import { CloseButton, PrimaryButton, SecondaryInput } from '../commons'
import { useEffect, useState } from 'react'

const addBookForm = {
    inventory: '',
    title: '',
    author: '',
    edition: '',
    place: '',
    editorial: '',
    year: '',
    theme: '',
    collection: ''
}

const formValidations = {
    inventory: [(value) => value.length > 0, 'El nombre de usuario es requerido'],
    title: [(value) => value.length > 0, 'El título es requerido'],
    author: [(value) => value.length > 0, 'El autor es requerido'],
    theme: [(value) => value.length > 0, 'El tema es requerido']
}

export const AddBookModal = () => {
    const { isAddBookModalOpen, closeAddBookModal, editBook } = useUiStore()
    const { startAddingBook, startUpdatingBook } = useBooksStore()

    const {
        inventory,
        title,
        author,
        edition,
        place,
        editorial,
        year,
        theme,
        collection,
        onInputChange,
        isFormValid,
        onResetForm,
        setFormState
    } = useForm(addBookForm, formValidations)

    useEffect(() => {
        if (editBook !== null) {
            setFormState({ ...editBook })
        }

        return () => {
            setFormState(addBookForm)
        }
    }, [editBook])

    const onSubmit = async (event) => {
        event.preventDefault()

        if (!isFormValid) return
        let res = false

        if (editBook === null) {
            res = await startAddingBook({
                inventory,
                title,
                author,
                edition,
                place,
                editorial,
                year,
                theme,
                collection
            })
        } else {
            res = await startUpdatingBook({
                id: editBook.id,
                inventory,
                title,
                author,
                edition,
                place,
                editorial,
                year,
                theme,
                collection
            })
        }

        if (res) {
            onResetForm()
            closeAddBookModal()
        }
    }

    return (
        <Modal
            className="absolute bottom-auto left-1/2 right-auto top-1/2 z-50 -mr-[50%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-4 shadow-lg"
            overlayClassName="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/30"
            isOpen={isAddBookModalOpen}
            onRequestClose={closeAddBookModal}
        >
            <section className="flex flex-col items-end">
                <CloseButton close={closeAddBookModal} />

                <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-12 px-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <SecondaryInput
                                name="inventory"
                                placeholder="#"
                                isRequired
                                onInputChange={onInputChange}
                                value={inventory}
                                type="number"
                                label="Número de inventario"
                            />
                        </div>

                        <div className="col-span-2">
                            <SecondaryInput
                                name="title"
                                placeholder="Rayuela"
                                isRequired
                                onInputChange={onInputChange}
                                value={title}
                                type="text"
                                label="Título"
                            />
                        </div>

                        <div className="col-span-2">
                            <SecondaryInput
                                name="author"
                                placeholder="Julio Cortázar"
                                isRequired
                                onInputChange={onInputChange}
                                value={author}
                                type="text"
                                label="Autor"
                            />
                        </div>

                        <div className="col-span-2">
                            <SecondaryInput
                                name="edition"
                                placeholder="Primera"
                                onInputChange={onInputChange}
                                value={edition}
                                type="text"
                                label="Edición"
                            />
                        </div>

                        <SecondaryInput
                            name="place"
                            placeholder="Buenos Aires"
                            onInputChange={onInputChange}
                            value={place}
                            type="text"
                            label="Lugar de publicación"
                        />

                        <SecondaryInput
                            name="year"
                            placeholder="1963"
                            onInputChange={onInputChange}
                            value={year}
                            type="number"
                            label="Año de publicación"
                        />

                        <div className="col-span-2">
                            <SecondaryInput
                                name="editorial"
                                placeholder="Siglo XXI Editores"
                                onInputChange={onInputChange}
                                value={editorial}
                                type="text"
                                label="Editorial"
                            />
                        </div>

                        <SecondaryInput
                            name="theme"
                            placeholder="Literatura"
                            onInputChange={onInputChange}
                            value={theme}
                            type="text"
                            isRequired
                            label="Tema"
                        />

                        <SecondaryInput
                            name="collection"
                            placeholder="Literatura Universal"
                            onInputChange={onInputChange}
                            value={collection}
                            type="text"
                            label="Colección"
                        />
                    </div>

                    <PrimaryButton disabled={!isFormValid}>Cargar</PrimaryButton>
                </form>

                <p className="mx-auto mt-4 font-assistant text-blue_600"></p>
            </section>
        </Modal>
    )
}
