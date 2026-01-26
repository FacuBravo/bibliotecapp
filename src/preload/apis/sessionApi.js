import { ipcRenderer } from 'electron'
import { IpcKeys } from '../../helpers'

export const sessionApi = {
    register: (user) => ipcRenderer.invoke(IpcKeys.SESSION.REGISTER, user),
    login: (user) => ipcRenderer.invoke(IpcKeys.SESSION.LOGIN, user),
    logout: () => ipcRenderer.invoke(IpcKeys.SESSION.LOGOUT),
    checkSessionToken: (check) => ipcRenderer.invoke(IpcKeys.SESSION.CHECK_SESSION, check)
}
