"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var fs = require("fs");
//const { app, BrowserWindow } = require("electron");
var path = require("path");
var url = require("url");
var win;
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    // load the dist folder from Angular
    win.loadURL(url.format({
        pathname: path.join(__dirname, "../../dist/index.html"),
        protocol: "file:",
        slashes: true
    }));
    win.webContents.openDevTools();
    // The following is optional and will open the DevTools:
    // win.webContents.openDevTools()
    win.on("closed", function () {
        win = null;
    });
    //IPC_CODE
    electron_1.ipcMain.on("getFiles", function (event, arg) {
        var files = fs.readdirSync(__dirname);
        win.webContents.send("getFilesResponse", files);
    });
}
electron_1.app.on("ready", createWindow);
// on macOS, closing the window doesn't quit the app
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
// initialize the app's main window
electron_1.app.on("activate", function () {
    if (win === null) {
        createWindow();
    }
});
//# sourceMappingURL=main.js.map