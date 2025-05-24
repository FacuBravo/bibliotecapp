import { app, shell, BrowserWindow, ipcMain, Menu } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'
import Database from 'better-sqlite3'

import iconPng from '../../resources/icon.png'
import iconIco from '../../resources/icon.ico'
import { checkSessionToken, login, logout, register } from './handlers'

let db
let session = null

function createWindow() {
    const mainWindow = new BrowserWindow({
        width: 900,
        height: 670,
        show: false,
        autoHideMenuBar: true,
        icon: process.platform === 'linux' ? { iconPng } : { iconIco },
        webPreferences: {
            preload: join(__dirname, '../preload/index.js'),
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

    ipcMain.on('ping', () => console.log('pong'))

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
    ipcMain.handle('check-session-token', (_, { sessionToken }) =>
        checkSessionToken(session, sessionToken)
    )
    ipcMain.handle('logout', () => logout(session))
}

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        db.close()
        app.quit()
    }
})
