import Modal from 'react-modal'
import { useUiStore } from '../../hooks'
import { CloseButton } from '../commons'
import pencilIcon from '../../assets/images/icons/Pencil.svg'

export const BookModal = () => {
    const { isBookModalOpen, closeBookModal, book } = useUiStore()

    if (!book) {
        return null
    }

    return (
        <Modal
            className="absolute bottom-auto left-1/2 right-auto top-1/2 z-50 -mr-[50%] -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-3xl bg-white p-4 shadow-lg"
            overlayClassName="fixed bottom-0 left-0 right-0 top-0 z-40 bg-black/30"
            isOpen={isBookModalOpen}
            onRequestClose={closeBookModal}
        >
            <section className="flex flex-col items-end">
                <div className="flex gap-2">
                    <button className="transition-transform hover:scale-90">
                        <img src={pencilIcon} alt="Edit Icon" />
                    </button>

                    <CloseButton close={closeBookModal} />
                </div>

                <article className="flex w-[30vw] min-w-64 flex-col gap-2 font-assistant text-2xl text-black">
                    <p>
                        {book.author}. "{book.title}"
                    </p>
                    <p>
                        {book.edition} {book.place} : {book.editorial},
                    </p>
                    <p>{book.year}</p>
                    <p>{book.theme}</p>
                    <p>{book.collection}</p>
                </article>
                <div className="absolute -bottom-12 -right-5 -z-10 h-32 w-32 rounded-full bg-blue_500"></div>
                <div className="absolute -bottom-10 right-14 -z-10 h-20 w-20 rounded-full bg-pink_400"></div>
            </section>
        </Modal>
    )
}
