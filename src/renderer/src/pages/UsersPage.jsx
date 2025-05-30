import { SearchInput } from '../components/commons'
import { useAuthStore, useForm } from '../hooks'
import plusPinkIcon from '../assets/images/icons/Plus_pink.svg'
import excelIcon from '../assets/images/icons/excel.png'
import { UsersTable, PartnersFileFunctions } from '../components/users'

const searchForm = {
    filter: ''
}

export const UsersPage = () => {
    const { user } = useAuthStore()
    const { filter, onInputChange } = useForm(searchForm)

    return (
        <main className="flex h-[calc(100vh-98px)] w-full flex-col items-center bg-catalog bg-cover bg-center bg-no-repeat px-8">
            <section className="flex h-[82px] w-4/5 justify-between pb-4 pt-6">
                <div className="flex w-fit items-center gap-1 font-supermercado text-2xl text-pink_600">
                    <h1>Usuarios</h1>

                    {user.sessionToken && (
                        <button className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90">
                            <img src={plusPinkIcon} alt="Add User Icon" />
                        </button>
                    )}

                    <button className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90">
                        <img src={excelIcon} alt="To Excel Icon" />
                    </button>
                </div>

                <PartnersFileFunctions />

                <SearchInput name="filter" value={filter} onInputChange={onInputChange} />
            </section>

            <UsersTable filter={filter} />
        </main>
    )
}
