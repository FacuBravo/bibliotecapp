import { ipcRenderer } from 'electron'
import { IpcKeys } from '../../helpers'

export const reportsApi = {
    getAuthorsWithMoreBooks: async () =>
        await ipcRenderer.invoke(IpcKeys.REPORTS.GET_AUTHORS_WITH_MORE_BOOKS),
    getMostBorrowedBooks: async () =>
        await ipcRenderer.invoke(IpcKeys.REPORTS.GET_MOST_BORROWED_BOOKS),
    getMostPopularThemes: async () =>
        await ipcRenderer.invoke(IpcKeys.REPORTS.GET_MOST_POPULAR_THEMES),
    getMostReaderSection: async () =>
        await ipcRenderer.invoke(IpcKeys.REPORTS.GET_MOST_READER_SECTION),
    getMostBorrowedStudents: async () =>
        await ipcRenderer.invoke(IpcKeys.REPORTS.GET_MOST_BORROWED_STUDENTS)
}
