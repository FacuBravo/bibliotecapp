import { PageSelector, SearchInput } from '../components/commons'
import plusIcon from '../assets/images/icons/Plus_pink.svg'
import excelIcon from '../assets/images/icons/Excel.png'
import { BooksTable, AddBookModal, BooksFileFunctions } from '../components/books'
import { useAuthStore, useForm, useUiStore, useBooksStore } from '../hooks'

const searchForm = {
    filter: ''
}

export const BooksPage = () => {
    const { user } = useAuthStore()
    const { openAddBookModal } = useUiStore()
    const { filter, onInputChange } = useForm(searchForm)
    const { books, startLoadingBooks, counter, page, isLast, orderBy } = useBooksStore()

    const catalogToExcel = async () => {
        const booksDTO = []

        for (const book of books) {
            const borrowed = book.borrowed == 1 ? 'Prestado' : 'Sin prestar'

            booksDTO.push({
                'Nro. inventario': book.inventory,
                Título: book.title,
                Autor: book.author,
                Edición: book.edition,
                Lugar: book.place,
                Editorial: book.editorial,
                Año: book.year,
                Tema: book.theme,
                Colección: book.collection,
                Estado: borrowed
            })
        }

        const filePath = await window.excelApi.openSaveDialog('catalogo.xlsx')

        if (filePath) {
            window.excelApi.exportToExcel(booksDTO, filePath)
        }
    }

    const onNextPage = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        startLoadingBooks(page + 1, orderBy, filter ? filter : undefined)
    }

    const onPreviousPage = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        })

        startLoadingBooks(page - 1, orderBy, filter ? filter : undefined)
    }

    const onGoToPage = (newPage) => {
        if (newPage !== page) {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            })

            startLoadingBooks(newPage, orderBy, filter ? filter : undefined)
        }
    }

    return (
        <>
            <main className="flex min-h-[calc(100vh-98px)] w-full flex-col items-center bg-catalog bg-cover bg-fixed bg-center bg-no-repeat p-8 pt-0">
                <section className="flex h-[82px] w-full justify-between pb-4 pt-6 lg:w-4/5">
                    <div className="flex w-64 items-center gap-1 font-supermercado text-2xl text-pink_600">
                        <h1>Catálogo</h1>

                        {user.sessionToken && (
                            <button
                                onClick={() => openAddBookModal()}
                                className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90"
                            >
                                <img src={plusIcon} alt="Add Book" />
                            </button>
                        )}

                        <button
                            onClick={() => catalogToExcel()}
                            className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90"
                        >
                            <img src={excelIcon} alt="Excel Icon" />
                        </button>
                    </div>

                    <BooksFileFunctions />

                    <SearchInput name="filter" value={filter} onInputChange={onInputChange} />
                </section>

                <BooksTable filter={filter} />

                {!(page === 0 && isLast) && (
                    <div className="mt-8 h-full w-full lg:w-4/5">
                        <PageSelector
                            onNextPage={onNextPage}
                            onPreviousPage={onPreviousPage}
                            onGoToPage={onGoToPage}
                            counter={counter}
                            page={page}
                            isLast={isLast}
                        />
                    </div>
                )}
            </main>

            <AddBookModal />
        </>
    )
}
