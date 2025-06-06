import { contextBridge, ipcMain, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'
import { IpcKeys } from '../helpers'

const sessionApi = {
    register: (user) => ipcRenderer.invoke(IpcKeys.SESSION.REGISTER, user),
    login: (user) => ipcRenderer.invoke(IpcKeys.SESSION.LOGIN, user),
    logout: () => ipcRenderer.invoke(IpcKeys.SESSION.LOGOUT),
    checkSessionToken: (check) => ipcRenderer.invoke(IpcKeys.SESSION.CHECK_SESSION, check)
}

const booksApi = {
    addBook: async (bookInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.BOOK.ADD, bookInfo)
        }

        return null
    },
    updateBook: async (bookInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return await ipcRenderer.invoke(IpcKeys.BOOK.UPDATE, bookInfo)
        } else {
            return null
        }
    },
    getBooks: async () => ipcRenderer.invoke(IpcKeys.BOOK.GET_ALL),
    deleteBook: async (id, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.BOOK.DELETE, { id })
        }

        return null
    },
    updateBookState: async (id, borrowed, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.BOOK.SET_STATE, { id, borrowed })
        }

        return null
    },
    addMultipleBooks: async (books, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.BOOK.ADD_MULTIPLE, books)
        }

        return null
    },
    deleteAllBooks: async (token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.BOOK.DELETE_ALL)
        }

        return null
    }
}

const partnersApi = {
    addPartner: async (partnerInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.PARTNER.ADD, partnerInfo)
        }

        return null
    },
    updatePartner: async (partnerInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return await ipcRenderer.invoke(IpcKeys.PARTNER.UPDATE, partnerInfo)
        } else {
            return null
        }
    },
    getPartners: async () => ipcRenderer.invoke(IpcKeys.PARTNER.GET_ALL),
    deletePartner: async (id, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.PARTNER.DELETE, { id })
        }

        return null
    },
    addMultiplePartners: async (partners, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.PARTNER.ADD_MULTIPLE, partners)
        }

        return null
    },
    deleteAllPartners: async (token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.PARTNER.DELETE_ALL)
        }

        return null
    }
}

const loansApi = {
    addLoan: async (loanInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.LOAN.ADD, loanInfo)
        }

        return null
    },
    updateLoan: async (loanInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return await ipcRenderer.invoke(IpcKeys.LOAN.UPDATE, loanInfo)
        } else {
            return null
        }
    },
    getLoans: async () => ipcRenderer.invoke(IpcKeys.LOAN.GET_ALL),
    updateLoanState: async (id, returned, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.LOAN.SET_STATE, { id, returned })
        }

        return null
    },
    addMultipleLoans: async (loans, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.LOAN.ADD_MULTIPLE, loans)
        }

        return null
    },
    deleteAllLoans: async (token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke(IpcKeys.LOAN.DELETE_ALL)
        }

        return null
    }
}

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('sessionApi', sessionApi)
        contextBridge.exposeInMainWorld('booksApi', booksApi)
        contextBridge.exposeInMainWorld('partnersApi', partnersApi)
        contextBridge.exposeInMainWorld('loansApi', loansApi)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.sessionApi = sessionApi
    window.booksApi = booksApi
    window.partnersApi = partnersApi
    window.loansApi = loansApi
}
