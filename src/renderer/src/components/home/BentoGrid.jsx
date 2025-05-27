import { Link } from 'react-router-dom'

import stackOfBooks from '../../assets/images/icons/Stack.svg'
import reportIcon from '../../assets/images/icons/Report.svg'
import { useBooksStore } from '../../hooks'

export const BentoGrid = () => {
    const { counter: booksCount } = useBooksStore()

    return (
        <section className="grid h-full max-h-[616px] w-full max-w-[616px] grid-cols-3 grid-rows-6 gap-4">
            <Link
                to="/loans"
                className="col-span-2 row-span-2 flex items-end justify-start rounded-3xl bg-gradient-to-l from-yellow_500 to-yellow_400 p-4 font-barrio text-xl text-yellow_600 shadow-lg"
            >
                <h2>Prestámos</h2>
            </Link>

            <div className="relative col-span-1 row-span-2 flex flex-col items-start justify-end gap-2 overflow-hidden rounded-3xl bg-pink_400 p-4 font-supermercado text-lg text-pink_600 shadow-lg">
                <div className="absolute -right-6 -top-6 h-[87px] w-[87px] rounded-full bg-pink_500"></div>
                <span className="mb-2 font-barrio text-[100px]">0</span>
                <h4>Usuarios cargados</h4>
            </div>

            <Link
                to="/catalog"
                className="col-span-1 row-span-4 flex flex-col items-end justify-between rounded-3xl bg-gradient-to-b from-blue_400 to-blue_500 pt-4 font-barrio text-xl text-blue_600 shadow-lg"
            >
                <h2 className="mr-4">Catálogo</h2>
                <img className="w-full" src={stackOfBooks} alt="Pila de libros Icon" />
            </Link>

            <div className="relative col-span-1 row-span-1 flex flex-col items-end justify-between overflow-hidden rounded-3xl bg-green_400 p-4 font-supermercado text-lg text-green_600 shadow-lg before:absolute before:-left-8 before:top-0 before:h-1/2 before:w-[200px] before:rotate-[60deg] before:bg-green_500 before:content-[''] after:absolute after:left-14 after:top-0 after:h-1/2 after:w-[200px] after:rotate-[60deg] after:bg-green_500 after:content-['']">
                <span className="z-10 font-barrio text-[32px]">0</span>
                <h4 className="z-10">Préstamos activos</h4>
            </div>

            <Link
                to="/"
                className="col-span-1 row-span-4 flex items-end justify-center rounded-3xl bg-gradient-to-b from-green_500 to-green_400 p-4 font-barrio text-xl text-green_600 shadow-lg"
            >
                <h2 className="w-full text-start">Reportes</h2>
                <img src={reportIcon} alt="Reportes Icon" />
            </Link>

            <div className="col-span-1 row-span-1 flex flex-col justify-between rounded-3xl bg-gradient-to-l from-pink_500 to-pink_400 p-4 font-supermercado text-lg text-pink_600 shadow-lg">
                <span className="font-barrio text-[32px]">{booksCount}</span>
                <h4>Libros cargados</h4>
            </div>

            <Link
                to="/users"
                className="col-span-1 row-span-2 flex items-end rounded-3xl bg-gradient-to-b from-yellow_500 to-yellow_400 p-4 font-barrio text-xl text-yellow_600 shadow-lg"
            >
                <h2>Usuarios</h2>
            </Link>
        </section>
    )
}
