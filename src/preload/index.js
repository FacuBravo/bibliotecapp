import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const sessionApi = {
    register: (user) => ipcRenderer.invoke('register', user),
    login: (user) => ipcRenderer.invoke('login', user),
    logout: () => ipcRenderer.invoke('logout'),
    checkSessionToken: (check) => ipcRenderer.invoke('check-session-token', check)
}

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('sessionApi', sessionApi)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.sessionApi = sessionApi
}
