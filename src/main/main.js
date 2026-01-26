import { app, shell, BrowserWindow, Menu } from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import { join } from 'path'

import iconPng from '../../resources/icon.png'
import iconIco from '../../resources/icon.ico'
import { createDb } from './helpers/createDb'
import { createTables } from './helpers/createTables'
import { setHandlers } from './helpers/setHandlers'

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

app.whenReady().then(async () => {
    electronApp.setAppUserModelId('com.bibliotecapp')

    app.on('browser-window-created', (_, window) => {
        optimizer.watchWindowShortcuts(window)
    })

    createWindow()

    app.on('activate', function () {
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })

    db = await createDb()
    await createTables(db)

    setHandlers(db)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        db.close()
        app.quit()
    }
})
