import { useEffect, useState } from 'react'

import { useAuthStore, useBooksStore, useUiStore } from '../../hooks'
import arrowIcon from '../../assets/images/icons/Arrow.svg'
import infoIcon from '../../assets/images/icons/Info.svg'
import trashIcon from '../../assets/images/icons/Trash.svg'
import { BookModal } from './BookModal'

export const BooksTable = ({ filter }) => {
    const { books, startDeletingBook, orderBy, sortBy } = useBooksStore()
    const { user } = useAuthStore()
    const [filteredBooks, setFilteredBooks] = useState(books)
    const { openBookModal, openConfirmModal } = useUiStore()

    useEffect(() => {
        if (filter !== '') {
            setFilteredBooks(
                books.filter((book) => {
                    return (
                        book.title.toLowerCase().includes(filter.toLowerCase()) ||
                        book.author.toLowerCase().includes(filter.toLowerCase()) ||
                        book.theme.toLowerCase().includes(filter.toLowerCase()) ||
                        book.inventory.toString().toLowerCase().includes(filter.toLowerCase())
                    )
                })
            )
        } else {
            setFilteredBooks(books)
        }
    }, [filter, books])

    const deleteBook = (id) => {
        startDeletingBook({ id })
    }

    return (
        <>
            <table className="flex h-full w-4/5 flex-col gap-6">
                <thead className="font-supermercado text-xl">
                    <tr className="flex items-center rounded-2xl bg-yellow_500 px-6 py-4 text-yellow_600 shadow-md">
                        <td
                            onClick={() => sortBy('inventory')}
                            className="flex w-[5%] cursor-pointer items-center"
                        >
                            #
                            <img
                                className={
                                    (orderBy.field === 'inventory'
                                        ? orderBy.order === 'desc' && 'rotate-180'
                                        : 'hidden') + ' transition-transform'
                                }
                                src={arrowIcon}
                                alt="Arrow Icon"
                            />
                        </td>

                        <td
                            onClick={() => sortBy('title')}
                            className="flex w-[27%] cursor-pointer items-center"
                        >
                            Título
                            <img
                                className={
                                    (orderBy.field === 'title'
                                        ? orderBy.order === 'desc' && 'rotate-180'
                                        : 'hidden') + ' transition-transform'
                                }
                                src={arrowIcon}
                                alt="Arrow Icon"
                            />
                        </td>

                        <td
                            onClick={() => sortBy('author')}
                            className="flex w-[27%] cursor-pointer items-center"
                        >
                            Autor
                            <img
                                className={
                                    (orderBy.field === 'author'
                                        ? orderBy.order === 'desc' && 'rotate-180'
                                        : 'hidden') + ' transition-transform'
                                }
                                src={arrowIcon}
                                alt="Arrow Icon"
                            />
                        </td>

                        <td
                            onClick={() => sortBy('theme')}
                            className="flex w-[27%] cursor-pointer items-center"
                        >
                            Tema
                            <img
                                className={
                                    (orderBy.field === 'theme'
                                        ? orderBy.order === 'desc' && 'rotate-180'
                                        : 'hidden') + ' transition-transform'
                                }
                                src={arrowIcon}
                                alt="Arrow Icon"
                            />
                        </td>

                        <td className="w-[14%] items-center justify-end text-end">Acciones</td>
                    </tr>
                </thead>

                <tbody className="flex flex-col gap-6 font-assistant text-lg">
                    {filteredBooks.map((book, index) => (
                        <tr
                            key={book.id}
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
                                            <button className="cursor-pointer rounded-lg bg-orange_600 p-2 text-white">
                                                Prestar
                                            </button>
                                        )}
                                    </>
                                )}
                                {book.borrowed == 1 && <p>Prestado</p>}
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <BookModal />
        </>
    )
}
