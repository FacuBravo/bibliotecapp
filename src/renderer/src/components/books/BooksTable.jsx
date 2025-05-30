import { useEffect, useState } from 'react'

import { useBooksStore } from '../../hooks'
import arrowIcon from '../../assets/images/icons/Arrow.svg'
import { BookModal } from './BookModal'
import { BookRow } from './BookRow'

export const BooksTable = ({ filter }) => {
    const { books, orderBy, sortBy } = useBooksStore()
    const [filteredBooks, setFilteredBooks] = useState(books)

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
                    {filteredBooks.length === 0 ? (
                        filter !== '' ? (
                            <tr className="flex items-center rounded-2xl bg-yellow_400 px-6 py-4 text-yellow_600 shadow-md">
                                <td className="w-full text-center">No hay resultados</td>
                            </tr>
                        ) : (
                            <tr className="flex items-center rounded-2xl bg-yellow_400 px-6 py-4 text-yellow_600 shadow-md">
                                <td className="w-full text-center">No hay libros</td>
                            </tr>
                        )
                    ) : (
                        <></>
                    )}

                    {filteredBooks.map((book, index) => (
                        <BookRow key={book.id} book={book} index={index} />
                    ))}
                </tbody>
            </table>

            <BookModal />
        </>
    )
}
