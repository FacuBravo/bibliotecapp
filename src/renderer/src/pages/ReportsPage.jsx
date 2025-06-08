import { useReportsStore } from '../hooks/useReportsStore'

export const ReportsPage = () => {
    const {
        authorsWithMoreBooks = [],
        mostBorrowedBooks = [],
        mostPopularThemes = [],
        mostReaderSection = []
    } = useReportsStore()

    return (
        <main className="flex min-h-[calc(100vh-98px)] w-full items-center justify-center gap-5 bg-home bg-cover bg-fixed bg-center bg-no-repeat">
            <section className="flex flex-col items-end gap-5">
                <article className="flex w-fit flex-col gap-5 rounded-2xl bg-pink_400 p-4 text-pink_600">
                    <h2 className="font-barrio text-3xl">Libros más prestados</h2>
                    <ul className="flex select-text list-none flex-col gap-4 font-assistant text-xl">
                        {mostBorrowedBooks.map((book, index) => (
                            <li key={index}>
                                <p className="font-bold">#{book.inventory}</p>
                                <p>{book.title}</p>
                                <p>- {book.author}</p>
                                <p>
                                    {book.n_borrowed} {book.n_borrowed === 1 ? 'vez' : 'veces'}{' '}
                                    prestado
                                </p>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="flex w-fit flex-col gap-5 rounded-2xl bg-yellow_400 p-4 text-yellow_600">
                    <h2 className="font-barrio text-3xl">Temas más elegidos</h2>
                    <ul className="flex select-text list-none flex-col gap-4 font-assistant text-xl">
                        {mostPopularThemes.map((report, index) => (
                            <li key={index}>
                                <p>{report.theme}</p>
                                <p>
                                    <span className="font-bold">{report.n_borrowed}</span>{' '}
                                    {report.n_borrowed === 1 ? 'vez' : 'veces'} prestado
                                </p>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>

            <section className="flex flex-col items-start gap-5">
                <article className="flex w-fit flex-col gap-5 rounded-2xl bg-orange_400 p-4 text-orange_600">
                    <h2 className="font-barrio text-3xl">Cursos más lectores</h2>
                    <ul className="flex select-text list-none flex-col gap-4 font-assistant text-xl">
                        {mostReaderSection.map((report, index) => (
                            <li key={index}>
                                <p className="font-bold">
                                    {report.grade} "{report.section}"
                                </p>
                                <p>Sacó {report.n_borrowed} libros</p>
                            </li>
                        ))}
                    </ul>
                </article>

                <article className="flex w-fit flex-col gap-5 rounded-2xl bg-blue_400 p-4 text-blue_600">
                    <h2 className="font-barrio text-3xl">Autores con más libros</h2>
                    <ul className="flex select-text list-none flex-col gap-4 font-assistant text-xl">
                        {authorsWithMoreBooks.map((author, index) => (
                            <li key={index}>
                                <p>{author.author}</p>
                                <p>
                                    <span className="font-bold">{author.n_books}</span> libros
                                </p>
                            </li>
                        ))}
                    </ul>
                </article>
            </section>
        </main>
    )
}
