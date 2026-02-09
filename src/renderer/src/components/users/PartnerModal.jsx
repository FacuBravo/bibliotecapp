import Modal from 'react-modal'
import { useAuthStore, useLoansStore, useUiStore } from '../../hooks'
import { CloseButton } from '../commons'
import pencilIcon from '../../assets/images/icons/Pencil.svg'
import { useEffect, useState } from 'react'

export const PartnerModal = ({ showEdit = true }) => {
    const { user } = useAuthStore()
    const { isPartnerModalOpen, closePartnerModal, partner, openAddPartnerModal } = useUiStore()
    const { getBorrowedBooksByPartner } = useLoansStore()
    const [borrowedBooks, setBorrowedBooks] = useState([])

    useEffect(() => {
        const fetchBorrowedBooks = async () => {
            if (partner) {
                const response = await getBorrowedBooksByPartner(partner.id_card)
                setBorrowedBooks(response)
            }
        }

        fetchBorrowedBooks()
    }, [partner])

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
                    {user.sessionToken && showEdit && (
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

                    {borrowedBooks.length > 0 && (
                        <div className="mt-4">
                            <strong>Libros prestados:</strong>
                            <ul className="max-h-80 list-none overflow-y-scroll p-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                                {borrowedBooks.map((book) => (
                                    <li className="my-2 text-xl" key={book.id}>
                                        #{book.book_id} - "{book.title}"
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}
                </article>

                <div className="absolute -bottom-12 -right-5 -z-10 h-32 w-32 rounded-full bg-blue_500"></div>
                <div className="absolute -bottom-10 right-14 -z-10 h-20 w-20 rounded-full bg-pink_400"></div>
            </section>
        </Modal>
    )
}
