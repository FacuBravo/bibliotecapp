import { contextBridge } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { booksApi, excelApi, loansApi, partnersApi, reportsApi, sessionApi } from './apis'

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('sessionApi', sessionApi)
        contextBridge.exposeInMainWorld('booksApi', booksApi)
        contextBridge.exposeInMainWorld('partnersApi', partnersApi)
        contextBridge.exposeInMainWorld('loansApi', loansApi)
        contextBridge.exposeInMainWorld('reportsApi', reportsApi)
        contextBridge.exposeInMainWorld('excelApi', excelApi)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.sessionApi = sessionApi
    window.booksApi = booksApi
    window.partnersApi = partnersApi
    window.loansApi = loansApi
    window.reportsApi = reportsApi
    window.excelApi = excelApi
}
