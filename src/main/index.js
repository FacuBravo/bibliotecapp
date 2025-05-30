import { app, shell, BrowserWindow, ipcMain, Menu } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'
import Database from 'better-sqlite3'

import iconPng from '../../resources/icon.png'
import iconIco from '../../resources/icon.ico'
import {
    addBook,
    addMultipleBooks,
    addMultiplePartners,
    addPartner,
    checkSessionToken,
    deleteAllBooks,
    deleteAllPartners,
    deleteBook,
    deletePartner,
    getBook,
    getBooks,
    getPartner,
    getPartners,
    login,
    logout,
    register,
    setBookState,
    updateBook,
    updatePartner
} from './handlers'
import { IpcKeys } from '../helpers'

let db

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        icon: process.platform === 'linux' ? { iconPng } : { iconIco },
        webPreferences: {
            preload: join(__dirname, '../preload/preload.js'),
            sandbox: false
        }
    })

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
    electronApp.setAppUserModelId('com.electron')

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
    db = new Database('mydb.db')

    db.pragma('foreign_keys = ON')
    db.pragma('journal_mode = WAL')

    createTables()

    setSessionHandlers()
    setBooksHandlers()
    setPartnersHandlers()
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
            date_start DATE, 
            date_end DATE, 
            returned INTEGER,
            book_id INTEGER, 
            partner_id INTEGER,
            FOREIGN KEY (book_id) REFERENCES book (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE,
            FOREIGN KEY (partner_id) REFERENCES partner (id) 
            ON DELETE CASCADE 
            ON UPDATE CASCADE)`
    ).run()
}

function setSessionHandlers() {
    ipcMain.handle('register', (_, { username, password }) => register(db, username, password))
    ipcMain.handle('login', (_, { username, password }) => login(db, username, password))
    ipcMain.handle('check-session-token', (_, { sessionToken }) => checkSessionToken(sessionToken))
    ipcMain.handle('logout', () => logout())
}

function setBooksHandlers() {
    ipcMain.handle('add-book', (_, bookInfo) => addBook(db, bookInfo))

    ipcMain.handle('set-book-state', (_, { id, borrowed }) => setBookState(db, { id, borrowed }))

    ipcMain.handle('update-book', (_, bookInfo) => updateBook(db, bookInfo))
    ipcMain.handle('get-books', () => getBooks(db))

    ipcMain.handle('get-book', (_, { id }) => getBook(db, { id }))

    ipcMain.handle('delete-book', (_, { id }) => deleteBook(db, { id }))

    ipcMain.handle('add-multiple-books', (_, books) => addMultipleBooks(db, books))

    ipcMain.handle('delete-all-books', () => deleteAllBooks(db))
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

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        db.close()
        app.quit()
    }
})
