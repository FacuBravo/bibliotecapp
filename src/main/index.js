import { app, shell, BrowserWindow, ipcMain, Menu } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'
import { existsSync, mkdirSync } from 'fs'
import Database from 'better-sqlite3'

import iconPng from '../../resources/icon.png'
import iconIco from '../../resources/icon.ico'
import {
    addBook,
    addLoan,
    addMultipleBooks,
    addMultipleLoans,
    addMultiplePartners,
    addPartner,
    checkSessionToken,
    deleteAllBooks,
    deleteAllLoans,
    deleteAllPartners,
    deleteBook,
    deletePartner,
    getAuthorsWithMoreBooks,
    getBook,
    getBooks,
    getLoan,
    getLoans,
    getMostBorrowedBooks,
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
} from './handlers'
import { IpcKeys } from '../helpers'

let db

app.commandLine.appendSwitch('no-sandbox')

function createWindow() {
    const mainWindow = new BrowserWindow({
        show: false,
        autoHideMenuBar: true,
        icon: process.platform === 'linux' ? { iconPng } : { iconIco },
        webPreferences: {
            preload: join(__dirname, '../preload/preload.js'),
            sandbox: false
        }
    })

    mainWindow.maximize()

    mainWindow.on('ready-to-show', () => {
        mainWindow.show()
    })

    mainWindow.webContents.setWindowOpenHandler((details) => {
        shell.openExternal(details.url)
        return { action: 'deny' }
    })

    if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
        mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
    } else {
        mainWindow.loadFile(join(__dirname, '../renderer/index.html'))
    }

    Menu.setApplicationMenu(null)
}

app.whenReady().then(() => {
    electronApp.setAppUserModelId('com.bibliotecapp')

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    createDb()
})

function createDb() {
    const dbDir = join(os.homedir(), '.bibliotecapp')
    if (!existsSync(dbDir)) {
        mkdirSync(dbDir, { recursive: true })
    }

    const dbPath = join(dbDir, 'mydb.db')

    db = new Database(dbPath)

    db.pragma('foreign_keys = ON')
    db.pragma('journal_mode = WAL')

    createTables()

    setSessionHandlers()
    setBooksHandlers()
    setPartnersHandlers()
    setLoansHandlers()
    setReportsHandlers()
}

function createTables() {
    db.prepare(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            username varchar(20) UNIQUE, 
            password TEXT)`
    ).run()

    db.prepare(
        `CREATE TABLE IF NOT EXISTS partner (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            id_card TEXT UNIQUE,
            name varchar(100), 
            surname varchar(100), 
            grade varchar(20), 
            section varchar(10), 
            type varchar(20))`
    ).run()

    db.prepare(
        `CREATE TABLE IF NOT EXISTS book (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            inventory INTEGER UNIQUE,
            title varchar(150), 
            author varchar(400), 
            edition varchar(100) NULL, 
            place varchar(100) NULL, 
            editorial varchar(100) NULL, 
            year INTEGER NULL,
            borrowed INTEGER,
            theme varchar(100),
            collection varchar(80) NULL)`
    ).run()

    db.prepare(
        `CREATE TABLE IF NOT EXISTS loan (
            id INTEGER PRIMARY KEY AUTOINCREMENT, 
            date_start varchar(10), 
            date_end varchar(10), 
            returned INTEGER,
            book_id INTEGER, 
            partner_id TEXT,
            FOREIGN KEY (book_id) REFERENCES book (inventory) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE,
            FOREIGN KEY (partner_id) REFERENCES partner (id_card) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE)`
    ).run()
}

function setSessionHandlers() {
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

function setBooksHandlers() {
    ipcMain.handle(IpcKeys.BOOK.ADD, (_, bookInfo) => addBook(db, bookInfo))

    ipcMain.handle(IpcKeys.BOOK.SET_STATE, (_, { id, borrowed }) =>
        setBookState(db, { id, borrowed })
    )

    ipcMain.handle(IpcKeys.BOOK.UPDATE, (_, bookInfo) => updateBook(db, bookInfo))
    ipcMain.handle(IpcKeys.BOOK.GET_ALL, () => getBooks(db))

    ipcMain.handle(IpcKeys.BOOK.GET, (_, { id }) => getBook(db, { id }))

    ipcMain.handle(IpcKeys.BOOK.DELETE, (_, { id }) => deleteBook(db, { id }))

    ipcMain.handle(IpcKeys.BOOK.ADD_MULTIPLE, (_, books) => addMultipleBooks(db, books))

    ipcMain.handle(IpcKeys.BOOK.DELETE_ALL, () => deleteAllBooks(db))
}

function setPartnersHandlers() {
    ipcMain.handle(IpcKeys.PARTNER.ADD, (_, partnerInfo) => addPartner(db, partnerInfo))

    ipcMain.handle(IpcKeys.PARTNER.UPDATE, (_, partnerInfo) => updatePartner(db, partnerInfo))
    ipcMain.handle(IpcKeys.PARTNER.GET_ALL, () => getPartners(db))

    ipcMain.handle(IpcKeys.PARTNER.GET, (_, { id }) => getPartner(db, { id }))

    ipcMain.handle(IpcKeys.PARTNER.DELETE, (_, { id }) => deletePartner(db, { id }))

    ipcMain.handle(IpcKeys.PARTNER.ADD_MULTIPLE, (_, partners) => addMultiplePartners(db, partners))

    ipcMain.handle(IpcKeys.PARTNER.DELETE_ALL, () => deleteAllPartners(db))
}

function setLoansHandlers() {
    ipcMain.handle(IpcKeys.LOAN.ADD, (_, loanInfo) => addLoan(db, loanInfo))

    ipcMain.handle(IpcKeys.LOAN.UPDATE, (_, loanInfo) => updateLoan(db, loanInfo))

    ipcMain.handle(IpcKeys.LOAN.SET_STATE, (_, { id, returned }) =>
        setLoanState(db, { id, returned })
    )

    ipcMain.handle(IpcKeys.LOAN.GET_ALL, () => getLoans(db))

    ipcMain.handle(IpcKeys.LOAN.GET, (_, { id }) => getLoan(db, { id }))

    ipcMain.handle(IpcKeys.LOAN.ADD_MULTIPLE, (_, loans) => addMultipleLoans(db, loans))

    ipcMain.handle(IpcKeys.LOAN.DELETE_ALL, () => deleteAllLoans(db))
}

function setReportsHandlers() {
    ipcMain.handle(IpcKeys.REPORTS.GET_AUTHORS_WITH_MORE_BOOKS, () => getAuthorsWithMoreBooks(db))
    ipcMain.handle(IpcKeys.REPORTS.GET_MOST_BORROWED_BOOKS, () => getMostBorrowedBooks(db))
    ipcMain.handle(IpcKeys.REPORTS.GET_MOST_POPULAR_THEMES, () => getMostPopularThemes(db))
    ipcMain.handle(IpcKeys.REPORTS.GET_MOST_READER_SECTION, () => getMostReaderSection(db))
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        db.close()
        app.quit()
    }
})
