import { useEffect } from 'react'

import { useBooksStore } from '../../hooks'
import arrowIcon from '../../assets/images/icons/Arrow.svg'
import { BookModal, DuplicateBookModal, BookRow } from './'

export const BooksTable = ({ filter = '' }) => {
    const { books, orderBy, sortBy, startLoadingBooks } = useBooksStore()

    useEffect(() => {
        if (filter !== '') {
            startLoadingBooks(0, orderBy, filter)
        } else {
            startLoadingBooks(0, orderBy)
        }
    }, [filter])

    return (
        <>
            <table className="flex h-full w-full flex-col gap-6 lg:w-4/5">
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
                                        ? orderBy.order === 'asc' && 'rotate-180'
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
                                        ? orderBy.order === 'asc' && 'rotate-180'
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
                                        ? orderBy.order === 'asc' && 'rotate-180'
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
                                        ? orderBy.order === 'asc' && 'rotate-180'
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
                    {books.length === 0 ? (
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

                    {books.map((book, index) => (
                        <BookRow key={book.id} book={book} index={index} />
                    ))}
                </tbody>
            </table>

            <BookModal />
            <DuplicateBookModal />
        </>
    )
}
