import { SearchInput } from '../components/commons'
import plusIcon from '../assets/images/icons/Plus_pink.svg'
import excelIcon from '../assets/images/icons/excel.png'
import { BooksTable, AddBookModal } from '../components/books'
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
            <main className="flex h-[calc(100vh-98px)] w-full flex-col items-center bg-catalog bg-cover bg-center bg-no-repeat px-8">
                <section className="flex h-[82px] w-4/5 justify-between pb-4 pt-6">
                    <div className="flex w-fit items-center gap-1 font-supermercado text-2xl text-pink_600">
                        <h1>Catálogo</h1>

                        {user.sessionToken && (
                            <button
                                onClick={openAddBookModal}
                                className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90"
                            >
                                <img src={plusIcon} alt="Add Book" />
                            </button>
                        )}

                        <button className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90">
                            <img src={excelIcon} alt="To Excel" />
                        </button>
                    </div>

                    <SearchInput name="filter" value={filter} onInputChange={onInputChange} />
                </section>

                <BooksTable filter={filter} />
            </main>

            <AddBookModal />
        </>
    )
}
