import Modal from 'react-modal'
import { useAuthStore, useUiStore } from '../../hooks'
import { CloseButton } from '../commons'
import pencilIcon from '../../assets/images/icons/Pencil.svg'

export const PartnerModal = () => {
    const { user } = useAuthStore()
    const { isPartnerModalOpen, closePartnerModal, partner, openAddPartnerModal } = useUiStore()

    if (!partner) {
        return null
    }

    return (
        <Modal
            className="absolute bottom-auto left-1/2 right-auto top-1/2 z-50 -mr-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white p-4 shadow-lg"
            overlayClassName="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/30"
            isOpen={isPartnerModalOpen}
            onRequestClose={closePartnerModal}
        >
            <section className="flex flex-col items-end">
                <div className="flex gap-2">
                    {user.sessionToken && (
                        <button
                            onClick={() => {
                                openAddPartnerModal(partner)
                                closePartnerModal()
                            }}
                            className="transition-transform hover:scale-90"
                        >
                            <img src={pencilIcon} alt="Edit Icon" />
                        </button>
                    )}

                    <CloseButton close={closePartnerModal} />
                </div>

                <article className="flex w-[30vw] min-w-80 flex-col gap-2 font-assistant text-2xl text-black">
                    <h3>
                        <strong>Usuario #{partner.id}:</strong> {partner.surname}, {partner.name}
                    </h3>
                    {partner.grade && (
                        <p>
                            <strong>Grado:</strong> {partner.grade}
                        </p>
                    )}
                    {partner.section && (
                        <p>
                            <strong>Sección:</strong> {partner.section}
                        </p>
                    )}

                    {partner.type && (
                        <p>
                            <strong>Tipo:</strong> {partner.type}
                        </p>
                    )}
                </article>
                <div className="absolute -bottom-12 -right-5 -z-10 h-32 w-32 rounded-full bg-blue_500"></div>
                <div className="absolute -bottom-10 right-14 -z-10 h-20 w-20 rounded-full bg-pink_400"></div>
            </section>
        </Modal>
    )
}
