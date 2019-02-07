
import { app, BrowserWindow, ipcMain } from "electron";
import * as fs from 'fs';

//const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `../../dist/index.html`),
      protocol: "file:",
      slashes: true
    })
  );

  win.webContents.openDevTools();
  // The following is optional and will open the DevTools:
  // win.webContents.openDevTools()

  win.on("closed", () => {
    win = null;
  });



  //IPC_CODE
  ipcMain.on("getFiles", (event, arg) => {
    const files = fs.readdirSync(__dirname);
    win.webContents.send("getFilesResponse", files);
  });

}




app.on("ready", createWindow);

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});