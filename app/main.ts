// app/main.ts
import { app, BrowserWindow, ipcMain, Notification } from "electron";
import * as path from "path";

let mainWindow: Electron.BrowserWindow;

app.on("ready", () => {
    mainWindow = new BrowserWindow({
        icon: path.join(__dirname, "../dist/elitehelper/assets/icon.png"),
        webPreferences: {
            contextIsolation: false, // Allows IPC and other APIs
            nodeIntegration: true, // Allows IPC and other APIs
        }
    });
    //Swap Mainwindow loadFile for loadURL when in dev mode to allow for hot reload
    mainWindow.loadFile(path.join(__dirname, "../dist/elite-helper/index.html"));
    //mainWindow.loadURL('http://localhost:4200')

});

app.on("window-all-closed", () => {app.quit()});

ipcMain.on('request-env-variable', (event, arg) => {
    console.log("ENV Var requested: " + arg)
    new Notification({title: "EliteHelper", body: `${arg} == ${process.env[arg]}`}).show();
    mainWindow.webContents.send('e-msg-system', {type: arg, value: process.env[arg] });
});