import { BentoGrid } from '../components/home/BentoGrid'

export const HomePage = () => {
    return (
        <>
            <main className="flex min-h-[calc(100vh-98px)] w-full justify-center bg-home bg-cover bg-fixed bg-center bg-no-repeat px-8 py-32">
                <BentoGrid />
            </main>
        </>
    )
}
