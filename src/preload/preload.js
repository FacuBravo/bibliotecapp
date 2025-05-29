import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

const sessionApi = {
    register: (user) => ipcRenderer.invoke('register', user),
    login: (user) => ipcRenderer.invoke('login', user),
    logout: () => ipcRenderer.invoke('logout'),
    checkSessionToken: (check) => ipcRenderer.invoke('check-session-token', check)
}

const booksApi = {
    addBook: async (bookInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke('add-book', bookInfo)
        }

        return null
    },
    updateBook: async (bookInfo, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return await ipcRenderer.invoke('update-book', bookInfo)
        } else {
            return null
        }
    },
    getBooks: async () => ipcRenderer.invoke('get-books'),
    deleteBook: async (id, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke('delete-book', { id })
        }

        return null
    },
    updateBookState: async (callback, id, borrowed, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke('set-book-state', id, borrowed)
        }

        return null
    },
    addMultipleBooks: async (books, token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke('add-multiple-books', books)
        }

        return null
    },
    deleteAllBooks: async (token) => {
        const { ok: isAuthenticated } = await sessionApi.checkSessionToken({ sessionToken: token })

        if (isAuthenticated) {
            return ipcRenderer.invoke('delete-all-books')
        }

        return null
    }
}

if (process.contextIsolated) {
    try {
        contextBridge.exposeInMainWorld('electron', electronAPI)
        contextBridge.exposeInMainWorld('sessionApi', sessionApi)
        contextBridge.exposeInMainWorld('booksApi', booksApi)
    } catch (error) {
        console.error(error)
    }
} else {
    window.electron = electronAPI
    window.sessionApi = sessionApi
    window.booksApi = booksApi
}
