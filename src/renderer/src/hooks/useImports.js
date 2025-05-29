import { useState } from 'react'

export const useImports = () => {
    const [file, setFile] = useState(null)

    const startImportingCatalog = (file) => {
        const reader = new FileReader()

        reader.onload = function (e) {
            try {
                setFile(JSON.parse(e.target.result))
            } catch (error) {
                console.error('Error parsing JSON:', error)
            }
        }

        reader.onerror = function () {
            console.error('Error reading file: ', reader.error)
        }

        reader.readAsText(file)
    }

    return {
        file,
        startImportingCatalog
    }
}
