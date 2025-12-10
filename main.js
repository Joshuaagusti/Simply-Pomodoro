const { app, BrowserWindow } = require('electron');
const path = require('path');
const url = require('url');
const {ipcMain} = require('electron');
let win;

function createWindow() {
  win = new BrowserWindow({
    width: 320,
    height: 200,
    alwaysOnTop: true,
   
    resizable: true,
    focusable: false,
    frame: false,
    transparent: true, 
    show: false,
    webPreferences: {
      nodeIntegration: true,
      contextIsolation: false,
    }
  });


  win.loadURL(url.format({
    pathname: path.join(__dirname, 'index.html'),
    protocol: 'file:',
    slashes: true
  }));



  win.once('ready-to-show', () => {
    win.show();
  });


  win.on('closed', () => {
    win = null;
  });
}


app.whenReady().then(() => {
  createWindow();
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }5
});
ipcMain.on('close-app', () => {
  app.quit();
});



app.on('activate', () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});