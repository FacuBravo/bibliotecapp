import Modal from 'react-modal'

import { usePartnersStore, useForm, useUiStore } from '../../hooks'
import { CloseButton, PrimaryButton, RadioInput, SecondaryInput } from '../commons'
import { useEffect } from 'react'

const addPartnerForm = {
    name: '',
    surname: '',
    grade: '',
    section: '',
    type: ''
}

const formValidations = {
    name: [(value) => value.length > 0, 'El nombre de usuario es requerido'],
    surname: [(value) => value.length > 0, 'El apellido es requerido'],
    grade: [(value) => value.length > 0, 'El grado es requerido'],
    section: [(value) => value.length > 0, 'La sección es requerida'],
    type: [(value) => value.length > 0, 'El tipo es requerido']
}

export const AddPartnerModal = () => {
    const { isAddPartnerModalOpen, closeAddPartnerModal, editPartner } = useUiStore()
    const { startAddingPartner, startUpdatingPartner } = usePartnersStore()

    const {
        name,
        surname,
        grade,
        section,
        type,
        onInputChange,
        isFormValid,
        onResetForm,
        setFormState
    } = useForm(addPartnerForm, formValidations)

    useEffect(() => {
        if (editPartner !== null) {
            setFormState({ ...editPartner })
        }

        return () => {
            setFormState(addPartnerForm)
        }
    }, [editPartner])

    const onSubmit = async (event) => {
        event.preventDefault()

        if (!isFormValid) return
        let res = false

        if (editPartner === null) {
            res = await startAddingPartner({
                name,
                surname,
                grade,
                section,
                type
            })
        } else {
            res = await startUpdatingPartner({
                id: editPartner.id,
                name,
                surname,
                grade,
                section,
                type
            })
        }

        if (res) {
            onResetForm()
            closeAddPartnerModal()
        }
    }

    return (
        <Modal
            className="absolute bottom-auto left-1/2 right-auto top-1/2 z-50 -mr-[50%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-4 shadow-lg"
            overlayClassName="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/30"
            isOpen={isAddPartnerModalOpen}
            onRequestClose={closeAddPartnerModal}
        >
            <section className="flex flex-col items-end">
                <CloseButton close={closeAddPartnerModal} />

                <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-12 px-6">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="col-span-2">
                            <SecondaryInput
                                name="name"
                                placeholder="Ernesto"
                                isRequired
                                onInputChange={onInputChange}
                                value={name}
                                type="text"
                                label="Nombres"
                            />
                        </div>

                        <div className="col-span-2">
                            <SecondaryInput
                                name="surname"
                                placeholder="Sabato"
                                isRequired
                                onInputChange={onInputChange}
                                value={surname}
                                type="text"
                                label="Apellido"
                            />
                        </div>

                        <SecondaryInput
                            name="grade"
                            placeholder="5"
                            isRequired
                            onInputChange={onInputChange}
                            value={grade}
                            type="number"
                            label="Grado"
                        />

                        <SecondaryInput
                            name="section"
                            placeholder="A"
                            isRequired
                            onInputChange={onInputChange}
                            value={section}
                            type="text"
                            label="Sección"
                        />

                        <div className="col-span-2">
                            <RadioInput
                                name="type"
                                onInputChange={onInputChange}
                                isRequired
                                value={type}
                                label="Tipo"
                                options={[
                                    { value: 'Estudiante', label: 'Estudiante' },
                                    { value: 'Docente', label: 'Docente' }
                                ]}
                            />
                        </div>
                    </div>

                    <PrimaryButton disabled={!isFormValid}>Cargar</PrimaryButton>
                </form>

                <p className="mx-auto mt-4 font-assistant text-blue_600"></p>
            </section>
        </Modal>
    )
}
