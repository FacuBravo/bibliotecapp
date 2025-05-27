import plusIcon from '../assets/images/icons/Plus_pink.svg'
import excelIcon from '../assets/images/icons/excel.png'
import arrowIcon from '../assets/images/icons/Arrow.svg'
import { SearchInput } from '../components/commons'

export const BooksPage = () => {
    return (
        <main className="flex h-[calc(100vh-98px)] w-full flex-col bg-catalog bg-cover bg-center bg-no-repeat px-8">
            <section className="flex h-[82px] w-full justify-between pb-4 pt-6">
                <div className="flex w-fit items-center gap-1 font-supermercado text-2xl text-pink_600">
                    <h1>Catálogo</h1>

                    <button className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90">
                        <img src={plusIcon} alt="Add Book" />
                    </button>

                    <button className="h-8 cursor-pointer bg-transparent transition-transform hover:scale-90">
                        <img src={excelIcon} alt="To Excel" />
                    </button>
                </div>

                <SearchInput />
            </section>

            <table className="flex h-full w-full flex-col gap-6">
                <thead className="font-supermercado text-xl">
                    <tr className="flex items-center rounded-2xl bg-yellow_500 px-6 py-4 text-yellow_600 shadow-md transition-all">
                        <td className="flex w-[5%] cursor-pointer items-center">
                            #
                            <img
                                className="sort_img"
                                id="arrow_order_by_n"
                                src={arrowIcon}
                                alt="Arrow"
                            />
                        </td>
                        <td className="flex w-[27%] cursor-pointer items-center">
                            Título
                            <img
                                className="sort_img hidden"
                                id="arrow_order_by_title"
                                src={arrowIcon}
                                alt="Arrow"
                            />
                        </td>
                        <td className="flex w-[27%] cursor-pointer items-center">
                            Autor
                            <img
                                className="sort_img hidden"
                                id="arrow_order_by_author"
                                src={arrowIcon}
                                alt="Arrow"
                            />
                        </td>
                        <td className="flex w-[27%] cursor-pointer items-center">
                            Tema
                            <img
                                className="sort_img hidden"
                                id="arrow_order_by_theme"
                                src={arrowIcon}
                                alt="Arrow"
                            />
                        </td>
                        <td className="w-[14%] items-center justify-end text-end">Acciones</td>
                    </tr>
                </thead>

                <tbody className="flex flex-col gap-6 font-assistant text-lg"></tbody>
            </table>
        </main>
    )
}
