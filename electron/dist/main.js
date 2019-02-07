"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var fs = require("fs");
var fse = require('fs-extra');
//const { app, BrowserWindow } = require("electron");
var path = require("path");
var url = require("url");
var win;
electron_1.app.on("ready", createWindow);
// initialize the app's main window
electron_1.app.on("activate", function () {
    if (win === null) {
        createWindow();
    }
});
// on macOS, closing the window doesn't quit the app
electron_1.app.on("window-all-closed", function () {
    if (process.platform !== "darwin") {
        electron_1.app.quit();
    }
});
function createWindow() {
    win = new electron_1.BrowserWindow({ width: 800, height: 600 });
    // load the dist folder from Angular
    win.loadURL(url.format({
        pathname: path.join(__dirname, "../../dist/PlaFile3/index.html"),
        protocol: "file:",
        slashes: true
    }));
    win.webContents.openDevTools();
    // The following is optional and will open the DevTools:
    // win.webContents.openDevTools()
    win.on("closed", function () {
        win = null;
    });
}
//IPC_CODE https://stackoverflow.com/questions/11922383/access-process-nested-objects-arrays-or-json
electron_1.ipcMain.on("getFiles", function (event, arg) {
    // console.log(arg);
    var n_filename = arg["filename"];
    console.log('filename = ' + n_filename);
    var path_in = 'C:/Users/Al/Desktop' + arg["filepath"].replace("///", "/\/");
    var n_filepath = path_in;
    console.log('filepath = ' + n_filepath);
    var filehome = arg["filehome"];
    console.log('fileorigin = ' + filehome);
    var filetype = filehome.split('.').pop();
    console.log('filetype', filetype);
    // var o_file = arg["files"][0]["relativePath"];
    // console.log('relative path = ' + o_file);
    fse.mkdirs(n_filepath, function (err) {
        if (err)
            return console.error(err);
        console.log("success!");
    });
    var srcpath = filehome;
    console.log(srcpath);
    var dstpath = n_filepath + n_filename + filetype;
    console.log(dstpath);
    // With a callback:
    fse.move(srcpath, dstpath, function (err) {
        if (err)
            return console.error(err);
        console.log('success!');
    });
});
electron_1.ipcMain.on("getFiles", function (event, arg) {
    var files = fs.readdirSync(__dirname);
    win.webContents.send("getFilesResponse", arg);
});
//# sourceMappingURL=main.js.map