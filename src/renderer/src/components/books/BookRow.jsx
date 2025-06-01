import { useAuthStore, useBooksStore, useLoansStore, useUiStore } from '../../hooks'
import infoIcon from '../../assets/images/icons/Info.svg'
import trashIcon from '../../assets/images/icons/Trash.svg'
import { Link } from 'react-router-dom'

export const BookRow = ({ book, index }) => {
    const { user } = useAuthStore()
    const { startDeletingBook } = useBooksStore()
    const { openBookModal, openConfirmModal } = useUiStore()
    const { setLoanBook } = useLoansStore()

    const deleteBook = (id) => {
        startDeletingBook({ id })
    }

    return (
        <tr
            className={`${index % 2 === 0 ? 'bg-yellow_400' : 'bg-yellow_500'} flex items-center rounded-2xl px-6 py-4 text-yellow_600 shadow-md`}
        >
            <td className="w-[5%]">{book.inventory}</td>
            <td className="w-[27%]">{book.title}</td>
            <td className="w-[27%]">{book.author}</td>
            <td className="w-[27%]">{book.theme}</td>
            <td className="flex w-[14%] items-center justify-end gap-2 text-end">
                <button
                    onClick={() => openBookModal(book)}
                    className="cursor-pointer bg-transparent"
                >
                    <img className="h-8 w-8" src={infoIcon} alt="See more" />
                </button>

                {user.sessionToken && (
                    <>
                        <button
                            onClick={() =>
                                openConfirmModal({
                                    title: '¿Eliminar libro?',
                                    message: 'Esta acción no se puede deshacer',
                                    onConfirm: () => deleteBook(book.id)
                                })
                            }
                            className="cursor-pointer bg-transparent"
                        >
                            <img className="h-8 w-8" src={trashIcon} alt="Delete" />
                        </button>

                        {book.borrowed === 0 && (
                            <Link
                                onClick={() => setLoanBook(book)}
                                to="/loans"
                                className="cursor-pointer rounded-lg bg-orange_600 p-2 text-white"
                            >
                                Prestar
                            </Link>
                        )}
                    </>
                )}
                {book.borrowed == 1 && <p>Prestado</p>}
            </td>
        </tr>
    )
}
