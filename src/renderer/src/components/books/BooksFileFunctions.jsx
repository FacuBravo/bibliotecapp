import { useEffect, useRef } from 'react'
import exportIcon from '../../assets/images/icons/Export.svg'
import importIcon from '../../assets/images/icons/Import.svg'
import { exportToJSON } from '../../helpers'
import {
    useAuthStore,
    useBooksStore,
    useImports,
    useLoansStore,
    usePartnersStore,
    useUiStore
} from '../../hooks'

export const BooksFileFunctions = () => {
    const { user } = useAuthStore()
    const fileInputRef = useRef()
    const { books, multipleAddBooks } = useBooksStore()
    const { startImporting, file: importedBooks, resetFile } = useImports()
    const { startLoadingLoans } = useLoansStore()
    const { startLoadingPartners } = usePartnersStore()
    const { openConfirmModal, showLoader, hideLoader } = useUiStore()

    useEffect(() => {
        updateStores()
    }, [importedBooks])

    const updateStores = async () => {
        if (importedBooks) {
            await multipleAddBooks(importedBooks)
            await startLoadingLoans()
            await startLoadingPartners()
            hideLoader()
            resetFile()
        }
    }

    const onInputFileChange = ({ target }) => {
        if (target.files.length === 0) return

        showLoader()
        startImporting(target.files[0])
        target.value = ''
    }

    const openLoadImportFile = () => fileInputRef.current.click()

    return (
        <div className="flex gap-4">
            <button
                onClick={() => exportToJSON(books, 'catalogo.json')}
                className="flex cursor-pointer items-center gap-2 bg-transparent font-supermercado text-2xl text-pink_600 transition-transform hover:scale-95"
            >
                <img className="h-6 w-6" src={exportIcon} alt="Export JSON Icon" />
                Exportar
            </button>

            {user.sessionToken && (
                <button
                    onClick={() =>
                        openConfirmModal({
                            title: 'Importar Catálogo',
                            message: 'Está acción borrará todos los libros y prestamos actuales',
                            onConfirm: openLoadImportFile
                        })
                    }
                    className="flex cursor-pointer items-center gap-2 bg-transparent font-supermercado text-2xl text-pink_600 transition-transform hover:scale-95"
                >
                    <img className="h-6 w-6" src={importIcon} alt="Import JSON Icon" />
                    Importar
                </button>
            )}

            <input
                className="hidden"
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={onInputFileChange}
            />
        </div>
    )
}
