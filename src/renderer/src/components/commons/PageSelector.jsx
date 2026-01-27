import { useEffect, useState } from 'react'
import arrowIcon from '../../assets/images/icons/Arrow_secondary.svg'
import { BOOKS_LIMIT } from '../../consts'

export const PageSelector = ({ onNextPage, onPreviousPage, onGoToPage, counter, page, isLast }) => {
    const [totalPages, setTotalPages] = useState(0)
    const [pages, setPages] = useState([])

    useEffect(() => {
        setPages(initPagesArray())
    }, [counter, totalPages, page])

    const initPagesArray = () => {
        setTotalPages(Math.ceil(counter / BOOKS_LIMIT))

        if (totalPages <= 1) return []

        const current = page + 1
        const total = totalPages
        const delta = 1

        let startPage = Math.max(2, current - delta)
        let endPage = Math.min(total - 1, current + delta)

        if (current <= 3) {
            startPage = 2
            endPage = Math.min(4, total - 1)
        }

        if (current >= total - 2) {
            startPage = Math.max(total - 3, 2)
            endPage = total - 1
        }

        return Array.from({ length: endPage - startPage + 1 }, (_, i) => startPage + i)
    }

    return (
        <article className="font-body text-sz_button text-primary flex w-full items-center justify-between rounded bg-pink_400 p-1">
            <button
                disabled={page === 0}
                onClick={() => onPreviousPage()}
                className="rounded bg-pink_600 p-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <img className="h-6 w-6" src={arrowIcon} alt="Icono de anterior" />
            </button>

            <div className="flex items-center gap-1 md:gap-2">
                <button
                    className={`h-9 rounded p-1 md:w-9 ${page === 0 ? 'bg-pink_500 text-black' : ''}`}
                    onClick={() => onGoToPage(0)}
                >
                    1
                </button>

                {pages.length && pages[0] > 2 && (
                    <div className="h-9 w-6 rounded p-1 md:w-9">...</div>
                )}

                {pages.map((n) => (
                    <button
                        key={n}
                        className={`h-9 rounded p-1 text-black md:w-9 ${page === n - 1 ? 'bg-pink_500 text-black' : ''}`}
                        onClick={() => onGoToPage(n - 1)}
                    >
                        {n}
                    </button>
                ))}

                {pages.length && pages[pages.length - 1] < totalPages - 1 && (
                    <div className="h-9 w-6 rounded p-1 md:w-9">...</div>
                )}

                {totalPages > 1 && (
                    <button
                        className={`h-9 rounded p-1 md:w-9 ${page === totalPages - 1 ? 'bg-pink_500 text-black' : ''}`}
                        onClick={() => onGoToPage(totalPages - 1)}
                    >
                        {totalPages}
                    </button>
                )}
            </div>

            <button
                disabled={isLast}
                onClick={() => onNextPage()}
                className="rounded bg-pink_600 p-1 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <img className="h-6 w-6 rotate-180" src={arrowIcon} alt="Icono de siguiente" />
            </button>
        </article>
    )
}
