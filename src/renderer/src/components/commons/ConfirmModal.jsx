import Modal from 'react-modal'
import { useUiStore } from '../../hooks'
import { CloseButton } from './buttons/CloseButton'
import { PrimaryButton } from './buttons/PrimaryButton'

export const ConfirmModal = () => {
    const { confirmModal, closeConfirmModal } = useUiStore()

    const confirmAction = () => {
        closeConfirmModal()
        confirmModal.onConfirm()
    }

    return (
        <Modal
            className="absolute bottom-auto left-1/2 right-auto top-1/2 z-50 -mr-[50%] -translate-x-1/2 -translate-y-1/2 rounded-3xl bg-white p-4 shadow-lg"
            overlayClassName="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/30"
            isOpen={confirmModal.show}
            onRequestClose={closeConfirmModal}
        >
            <section className="flex flex-col items-end">
                <CloseButton close={closeConfirmModal} />

                <div className="mt-2 flex flex-col items-center gap-4 px-6 text-center">
                    <h3 className="font-supermercado text-3xl font-bold text-blue_600">
                        {confirmModal.title}
                    </h3>
                    <h4 className="font-assistant text-xl text-blue_600">{confirmModal.message}</h4>

                    <div className="mt-6 flex w-full gap-4">
                        <PrimaryButton onClick={closeConfirmModal}>Cerrar</PrimaryButton>
                        <PrimaryButton onClick={confirmAction}>Confirmar</PrimaryButton>
                    </div>
                </div>
            </section>
        </Modal>
    )
}
