import { useEffect, useState } from 'react'
import tune from '../../assets/images/icons/Tune.svg'

export const FiltersMenu = ({ onFilterChange }) => {
    const [showFilterChange, setShowFilterChange] = useState(false)
    const [filterSelected, setFilterSelected] = useState('all')

    useEffect(() => {
        onFilterChange(filterSelected)
    }, [filterSelected])

    const toggleFilterChange = () => setShowFilterChange(!showFilterChange)

    const closeFilterChange = () => {
        setShowFilterChange(false)
    }

    return (
        <>
            <div className="relative flex items-center">
                <button
                    onClick={toggleFilterChange}
                    className="rounded-full border-2 border-solid border-pink_600 bg-pink_400 p-1"
                >
                    <img src={tune} alt="Tune Icon" className="h-6 w-6" />
                </button>

                <nav
                    className={`${!showFilterChange && 'hidden'} absolute left-0 top-full z-20 min-w-[200px] translate-y-2 overflow-hidden rounded-2xl border-[3px] border-solid border-green_600 bg-green_400 p-4 px-6 transition-opacity`}
                >
                    <ul className="flex list-none flex-col gap-1">
                        <li>
                            <h3 className="flex items-center gap-3 bg-transparent pl-2 font-supermercado text-xl text-green_600 decoration-0">
                                Filtros
                            </h3>
                        </li>

                        <li>
                            <span className="mb-3 block h-[2px] w-full bg-green_600"></span>
                        </li>

                        <li>
                            <button
                                onClick={() => setFilterSelected('all')}
                                className={`${filterSelected === 'all' ? 'bg-blue_600 text-white shadow-md' : 'bg-transparent text-green_600'} flex items-center gap-3 rounded-lg px-4 py-1 font-supermercado text-xl`}
                            >
                                Todos
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => setFilterSelected('active')}
                                className={`${filterSelected === 'active' ? 'bg-green_600 text-white shadow-md' : 'bg-transparent text-green_600'} flex items-center gap-3 rounded-lg px-4 py-1 font-supermercado text-xl`}
                            >
                                Activos
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => setFilterSelected('expired')}
                                className={`${filterSelected === 'expired' ? 'bg-orange_600 text-white shadow-md' : 'bg-transparent text-green_600'} flex items-center gap-3 rounded-lg px-4 py-1 font-supermercado text-xl`}
                            >
                                Vencidos
                            </button>
                        </li>

                        <li>
                            <button
                                onClick={() => setFilterSelected('finished')}
                                className={`${filterSelected === 'finished' ? 'bg-pink_600 text-white shadow-md' : 'bg-transparent text-green_600'} flex items-center gap-3 rounded-lg px-4 py-1 font-supermercado text-xl`}
                            >
                                Finalizados
                            </button>
                        </li>
                    </ul>
                </nav>
            </div>

            {showFilterChange ? (
                <div
                    onClick={closeFilterChange}
                    className="fixed left-0 top-0 z-10 h-full w-full bg-transparent"
                ></div>
            ) : null}
        </>
    )
}
