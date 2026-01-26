import { ipcRenderer } from 'electron'
import { IpcKeys } from '../../helpers'

export const excelApi = {
    openSaveDialog: async (defaultName) =>
        ipcRenderer.invoke(IpcKeys.EXCEL.OPEN_SAVE_DIALOG, defaultName),
    exportToExcel: async (data, filePath) =>
        ipcRenderer.send(IpcKeys.EXCEL.EXPORT_TO_EXCEL, data, filePath)
}
