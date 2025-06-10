import { app, shell, BrowserWindow, ipcMain, Menu } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'
import { homedir } from 'os'
import { existsSync, mkdirSync } from 'fs'
import sqlite3 from 'sqlite3'
import { open } from 'sqlite'

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
    deleteLoan,
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

async function createDb() {
    const dbDir = join(homedir(), '.bibliotecapp')
    if (!existsSync(dbDir)) {
        mkdirSync(dbDir, { recursive: true })
    }

    const dbPath = join(dbDir, 'mydb.db')

    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    })

    await db.exec('PRAGMA foreign_keys = ON')

    await createTables()

    setSessionHandlers()
    setBooksHandlers()
    setPartnersHandlers()
    setLoansHandlers()
    setReportsHandlers()
}

async function createTables() {
    await db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      username VARCHAR(20) UNIQUE, 
      password TEXT
    )
  `)

    await db.run(`
    CREATE TABLE IF NOT EXISTS partner (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      id_card TEXT UNIQUE,
      name VARCHAR(100), 
      surname VARCHAR(100), 
      grade VARCHAR(20), 
      section VARCHAR(10), 
      type VARCHAR(20)
    )
  `)

    await db.run(`
    CREATE TABLE IF NOT EXISTS book (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      inventory INTEGER UNIQUE,
      title VARCHAR(150), 
      author VARCHAR(400), 
      edition VARCHAR(100), 
      place VARCHAR(100), 
      editorial VARCHAR(100), 
      year INTEGER,
      borrowed INTEGER,
      theme VARCHAR(100),
      collection VARCHAR(80)
    )
  `)

    await db.run(`
    CREATE TABLE IF NOT EXISTS loan (
      id INTEGER PRIMARY KEY AUTOINCREMENT, 
      date_start VARCHAR(10), 
      date_end VARCHAR(10), 
      returned INTEGER,
      book_id INTEGER, 
      partner_id TEXT,
      FOREIGN KEY (book_id) REFERENCES book (inventory) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE,
      FOREIGN KEY (partner_id) REFERENCES partner (id_card) 
        ON DELETE CASCADE 
        ON UPDATE CASCADE
    )
  `)
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

    ipcMain.handle(IpcKeys.LOAN.DELETE, (_, { id }) => deleteLoan(db, { id }))

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
