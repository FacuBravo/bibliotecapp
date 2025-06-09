import { SearchInput } from '../components/commons'
import { useAuthStore, useForm, useUiStore } from '../hooks'
import plusPinkIcon from '../assets/images/icons/Plus_pink.svg'
import { UsersTable, PartnersFileFunctions, AddPartnerModal } from '../components/users'

const searchForm = {
    filter: ''
}

export const UsersPage = () => {
    const { user } = useAuthStore()
    const { openAddPartnerModal } = useUiStore()
    const { filter, onInputChange } = useForm(searchForm)

    return (
        <>
            <main className="flex min-h-[calc(100vh-98px)] w-full flex-col items-center bg-catalog bg-cover bg-fixed bg-center bg-no-repeat p-8 pt-0">
                <section className="flex h-[82px] w-full justify-between pb-4 pt-6 lg:w-4/5">
                    <div className="flex w-fit items-center gap-1 font-supermercado text-2xl text-pink_600">
                        <h1>Usuarios</h1>

                        {user.sessionToken && (
                            <button
                                onClick={() => openAddPartnerModal()}
                                className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90"
                            >
                                <img src={plusPinkIcon} alt="Add User Icon" />
                            </button>
                        )}
                    </div>

                    <PartnersFileFunctions />

                    <SearchInput name="filter" value={filter} onInputChange={onInputChange} />
                </section>

                <UsersTable filter={filter} />
            </main>

            <AddPartnerModal />
        </>
    )
}
