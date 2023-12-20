const { app, BrowserWindow } = require('electron')
const next = require('next')
const dev = process.env.NODE_ENV !== 'production'
const nextApp = next({ dev })
const handle = nextApp.getRequestHandler()
function createWindow() {
  const win = new BrowserWindow({
    width: 1250,
    height: 700,
    minWidth: 400,
    minHeight: 300,
    maxWidth: 1400,
    maxHeight: 1200, 
    show: false,
    frame: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      sandbox: true,
    }
  });
  win.loadURL(`http://13.232.32.225:6080`)
  win.webContents.openDevTools()
}
app.whenReady().then(() => {
  nextApp.prepare().then(() => {
    createWindow()
    app.on('activate', function () {
      if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
  })
})
app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') app.quit()
})