import { ipcRenderer } from 'electron'
import { IpcKeys } from '../../helpers'

export const booksApi = {
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
    getBooks: async (params) => ipcRenderer.invoke(IpcKeys.BOOK.GET_ALL, params),
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
