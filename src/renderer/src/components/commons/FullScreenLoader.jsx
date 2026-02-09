import { useUiStore } from '../../hooks'

export const FullScreenLoader = () => {
    const { isLoaderOpen } = useUiStore()

    if (!isLoaderOpen) return null

    return (
        <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/20">
            <div className="h-16 w-16 animate-spin rounded-full border-4 border-solid border-blue_600 border-t-transparent"></div>
        </div>
    )
}
