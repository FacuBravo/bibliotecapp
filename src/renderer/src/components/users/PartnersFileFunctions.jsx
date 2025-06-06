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

export const PartnersFileFunctions = () => {
    const { user } = useAuthStore()
    const fileInputRef = useRef()
    const { partners, multipleAddPartners } = usePartnersStore()
    const { startImportingPartners, file: importedPartners, resetFile } = useImports()
    const { openConfirmModal } = useUiStore()
    const { startLoadingLoans } = useLoansStore()
    const { startLoadingBooks } = useBooksStore()

    useEffect(() => {
        updateStores()
    }, [importedPartners])

    const updateStores = async () => {
        if (importedPartners) {
            await multipleAddPartners(importedPartners)
            await startLoadingLoans()
            await startLoadingBooks()
            resetFile()
        }
    }

    const onInputFileChange = ({ target }) => {
        if (target.files.length === 0) return

        startImportingPartners(target.files[0])
        target.value = ''
    }

    const openLoadImportFile = () => fileInputRef.current.click()

    return (
        <div className="flex gap-4">
            <button
                onClick={() => exportToJSON(partners, 'usuarios.json')}
                className="flex cursor-pointer items-center gap-2 bg-transparent font-supermercado text-2xl text-pink_600 transition-transform hover:scale-95"
            >
                <img className="h-6 w-6" src={exportIcon} alt="Export JSON Icon" />
                Exportar
            </button>

            {user.sessionToken && (
                <button
                    onClick={() =>
                        openConfirmModal({
                            title: 'Importar Usuarios',
                            message:
                                'Está acción borrará todos los usuarios actuales y los préstamos',
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
