import Modal from 'react-modal'

import { useAuthStore, useForm, useUiStore } from '../../hooks'
import { CloseButton, PrimaryButton, PrimaryInput } from './'

Modal.setAppElement('#root')

const initialForm = { username: '', password: '' }
const formValidations = {
    username: [(value) => value.length > 0, 'El nombre de usuario es requerido'],
    password: [(value) => value.length > 0, 'La contraseña es requerida']
}

export const LoginModal = () => {
    const { startLogin, status } = useAuthStore()
    const { isLoginModalOpen, closeLoginModal, onShowAlert } = useUiStore()
    const { username, password, onInputChange, isFormValid, onResetForm } = useForm(
        initialForm,
        formValidations
    )

    const onSubmit = async (event) => {
        event.preventDefault()

        if (!isFormValid) return

        const res = await startLogin({ username, password })

        if (res) {
            onShowAlert(`Bienvenido ${username}!`, 'success')
            onResetForm()
            closeLoginModal()
        }
    }

    return (
        <Modal
            className="absolute bottom-auto left-1/2 right-auto top-1/2 z-50 -mr-[50%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-4 shadow-lg"
            overlayClassName="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/30"
            isOpen={isLoginModalOpen}
            onRequestClose={closeLoginModal}
        >
            <section className="flex flex-col items-end">
                <CloseButton close={closeLoginModal} />

                <form onSubmit={onSubmit} className="mt-4 flex flex-col gap-12 px-6">
                    <div className="flex flex-col gap-7">
                        <PrimaryInput
                            name="username"
                            label="Nombre de usuario"
                            isRequired
                            onInputChange={onInputChange}
                            value={username}
                            type="text"
                        />

                        <PrimaryInput
                            name="password"
                            label="Contraseña"
                            isRequired
                            onInputChange={onInputChange}
                            value={password}
                            type="password"
                        />
                    </div>

                    <PrimaryButton disabled={!isFormValid || status === 'checking'}>
                        Iniciar Sesión
                    </PrimaryButton>
                </form>

                <p className="mx-auto mt-4 font-assistant text-blue_600"></p>
            </section>
        </Modal>
    )
}
