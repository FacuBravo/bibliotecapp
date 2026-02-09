import { dialog, ipcMain } from 'electron'
import XLSX from 'xlsx'
import { writeFileSync } from 'fs'
import { IpcKeys } from '../../helpers'
import {
    addBook,
    addLoan,
    addMultipleBooks,
    addMultipleLoans,
    addMultiplePartners,
    addPartner,
    checkSessionToken,
    countActiveLoans,
    countBooks,
    countPartners,
    deleteAllBooks,
    deleteAllLoans,
    deleteAllPartners,
    deleteBook,
    deleteLoan,
    deletePartner,
    getAuthorsWithMoreBooks,
    getBook,
    getBooks,
    getLoan,
    getLoans,
    getMostBorrowedBooks,
    getMostBorrowedStudents,
    getMostPopularThemes,
    getMostReaderSection,
    getPartner,
    getPartners,
    login,
    logout,
    register,
    setBookState,
    setLoanState,
    updateBook,
    updateLoan,
    updatePartner
} from '../handlers'

export const setHandlers = (db) => {
    setSessionHandlers(db)
    setBooksHandlers(db)
    setPartnersHandlers(db)
    setLoansHandlers(db)
    setReportsHandlers(db)
    setExcelHandlers()
}

function setSessionHandlers(db) {
    ipcMain.handle(IpcKeys.SESSION.REGISTER, (_, { username, password }) =>
        register(db, username, password)
    )
    ipcMain.handle(IpcKeys.SESSION.LOGIN, (_, { username, password }) =>
        login(db, username, password)
    )
    ipcMain.handle(IpcKeys.SESSION.CHECK_SESSION, (_, { sessionToken }) =>
        checkSessionToken(sessionToken)
    )
    ipcMain.handle(IpcKeys.SESSION.LOGOUT, () => logout())
}

function setBooksHandlers(db) {
    ipcMain.handle(IpcKeys.BOOK.ADD, (_, bookInfo) => addBook(db, bookInfo))

    ipcMain.handle(IpcKeys.BOOK.SET_STATE, (_, { id, borrowed }) =>
        setBookState(db, { id, borrowed })
    )

    ipcMain.handle(IpcKeys.BOOK.UPDATE, (_, bookInfo) => updateBook(db, bookInfo))
    ipcMain.handle(IpcKeys.BOOK.GET_ALL, (_, offset, limit) => getBooks(db, offset, limit))

    ipcMain.handle(IpcKeys.BOOK.GET, (_, { id }) => getBook(db, { id }))

    ipcMain.handle(IpcKeys.BOOK.DELETE, (_, { id }) => deleteBook(db, { id }))

    ipcMain.handle(IpcKeys.BOOK.ADD_MULTIPLE, (_, books) => addMultipleBooks(db, books))

    ipcMain.handle(IpcKeys.BOOK.DELETE_ALL, () => deleteAllBooks(db))

    ipcMain.handle(IpcKeys.BOOK.COUNT_BOOKS, () => countBooks(db))
}

function setPartnersHandlers(db) {
    ipcMain.handle(IpcKeys.PARTNER.ADD, (_, partnerInfo) => addPartner(db, partnerInfo))

    ipcMain.handle(IpcKeys.PARTNER.UPDATE, (_, partnerInfo) => updatePartner(db, partnerInfo))
    ipcMain.handle(IpcKeys.PARTNER.GET_ALL, (_, offset, limit) => getPartners(db, offset, limit))

    ipcMain.handle(IpcKeys.PARTNER.GET, (_, { id }) => getPartner(db, { id }))

    ipcMain.handle(IpcKeys.PARTNER.DELETE, (_, { id }) => deletePartner(db, { id }))

    ipcMain.handle(IpcKeys.PARTNER.ADD_MULTIPLE, (_, partners) => addMultiplePartners(db, partners))

    ipcMain.handle(IpcKeys.PARTNER.DELETE_ALL, () => deleteAllPartners(db))

    ipcMain.handle(IpcKeys.PARTNER.COUNT_PARTNERS, () => countPartners(db))
}

function setLoansHandlers(db) {
    ipcMain.handle(IpcKeys.LOAN.ADD, (_, loanInfo) => addLoan(db, loanInfo))

    ipcMain.handle(IpcKeys.LOAN.UPDATE, (_, loanInfo) => updateLoan(db, loanInfo))

    ipcMain.handle(IpcKeys.LOAN.SET_STATE, (_, { id, returned }) =>
        setLoanState(db, { id, returned })
    )

    ipcMain.handle(IpcKeys.LOAN.GET_ALL, (_, offset, limit) => getLoans(db, offset, limit))

    ipcMain.handle(IpcKeys.LOAN.GET, (_, { id }) => getLoan(db, { id }))

    ipcMain.handle(IpcKeys.LOAN.DELETE, (_, { id }) => deleteLoan(db, { id }))

    ipcMain.handle(IpcKeys.LOAN.ADD_MULTIPLE, (_, loans) => addMultipleLoans(db, loans))

    ipcMain.handle(IpcKeys.LOAN.DELETE_ALL, () => deleteAllLoans(db))

    ipcMain.handle(IpcKeys.LOAN.COUNT_ACTIVE_LOANS, () => countActiveLoans(db))
}

function setReportsHandlers(db) {
    ipcMain.handle(IpcKeys.REPORTS.GET_AUTHORS_WITH_MORE_BOOKS, () => getAuthorsWithMoreBooks(db))
    ipcMain.handle(IpcKeys.REPORTS.GET_MOST_BORROWED_BOOKS, () => getMostBorrowedBooks(db))
    ipcMain.handle(IpcKeys.REPORTS.GET_MOST_POPULAR_THEMES, () => getMostPopularThemes(db))
    ipcMain.handle(IpcKeys.REPORTS.GET_MOST_READER_SECTION, () => getMostReaderSection(db))
    ipcMain.handle(IpcKeys.REPORTS.GET_MOST_BORROWED_STUDENTS, () => getMostBorrowedStudents(db))
}

function setExcelHandlers() {
    ipcMain.handle(IpcKeys.EXCEL.OPEN_SAVE_DIALOG, async (event, defaultName) => {
        const result = await dialog.showSaveDialog(mainWindow, {
            title: 'Guardar archivo Excel',
            defaultPath: defaultName || 'archivo.xlsx',
            filters: [{ name: 'Archivos Excel', extensions: ['xlsx'] }]
        })

        return result.filePath
    })

    ipcMain.on(IpcKeys.EXCEL.EXPORT_TO_EXCEL, (event, data, filePath) => {
        if (!filePath) return

        const worksheet = XLSX.utils.json_to_sheet(data)
        const workbook = XLSX.utils.book_new()
        XLSX.utils.book_append_sheet(workbook, worksheet, 'Hoja1')

        const excelBuffer = XLSX.write(workbook, {
            bookType: 'xlsx',
            type: 'buffer'
        })

        writeFileSync(filePath, excelBuffer)
    })
}
