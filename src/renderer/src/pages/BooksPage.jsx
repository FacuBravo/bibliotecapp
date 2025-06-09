import { SearchInput } from '../components/commons'
import plusIcon from '../assets/images/icons/Plus_pink.svg'
import { BooksTable, AddBookModal, BooksFileFunctions } from '../components/books'
import { useAuthStore, useForm, useUiStore } from '../hooks'

const searchForm = {
    filter: ''
}

export const BooksPage = () => {
    const { user } = useAuthStore()
    const { openAddBookModal } = useUiStore()
    const { filter, onInputChange } = useForm(searchForm)

    return (
        <>
            <main className="flex min-h-[calc(100vh-98px)] w-full flex-col items-center bg-catalog bg-cover bg-fixed bg-center bg-no-repeat p-8 pt-0">
                <section className="flex h-[82px] w-full justify-between pb-4 pt-6 lg:w-4/5">
                    <div className="flex w-fit items-center gap-1 font-supermercado text-2xl text-pink_600">
                        <h1>Catálogo</h1>

                        {user.sessionToken && (
                            <button
                                onClick={() => openAddBookModal()}
                                className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90"
                            >
                                <img src={plusIcon} alt="Add Book" />
                            </button>
                        )}
                    </div>

                    <BooksFileFunctions />

                    <SearchInput name="filter" value={filter} onInputChange={onInputChange} />
                </section>

                <BooksTable filter={filter} />
            </main>

            <AddBookModal />
        </>
    )
}
