import { useState } from 'react'

export const useImports = () => {
    const [file, setFile] = useState(null)

    const startImporting = (file) => {
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

    const resetFile = () => setFile(null)

    return {
        file,
        startImporting,
        resetFile
    }
}
