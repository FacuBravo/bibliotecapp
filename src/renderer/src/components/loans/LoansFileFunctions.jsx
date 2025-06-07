import { useEffect, useRef } from 'react'
import exportIcon from '../../assets/images/icons/Export.svg'
import importIcon from '../../assets/images/icons/Import.svg'
import { exportToJSON } from '../../helpers'
import { useAuthStore, useImports, useLoansStore, useUiStore } from '../../hooks'

export const LoansFileFunctions = () => {
    const { user } = useAuthStore()
    const fileInputRef = useRef()
    const { loans, multipleAddLoans } = useLoansStore()
    const { startImporting, file: importedLoans, resetFile } = useImports()
    const { openConfirmModal } = useUiStore()

    useEffect(() => {
        updateStores()
    }, [importedLoans])

    const updateStores = async () => {
        if (importedLoans) {
            await multipleAddLoans(importedLoans)
            resetFile()
        }
    }

    const onInputFileChange = ({ target }) => {
        if (target.files.length === 0) return

        startImporting(target.files[0])
        target.value = ''
    }

    const openLoadImportFile = () => fileInputRef.current.click()

    return (
        <div className="flex gap-4">
            <button
                onClick={() => exportToJSON(loans, 'prestamos.json')}
                className="flex cursor-pointer items-center gap-2 bg-transparent font-supermercado text-2xl text-pink_600 transition-transform hover:scale-95"
            >
                <img className="h-6 w-6" src={exportIcon} alt="Export JSON Icon" />
                Exportar
            </button>

            {user.sessionToken && (
                <button
                    onClick={() =>
                        openConfirmModal({
                            title: 'Importar Prestamos',
                            message: 'Está acción borrará todos los prestamos actuales',
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
