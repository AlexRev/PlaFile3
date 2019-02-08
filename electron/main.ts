
import { app, BrowserWindow, ipcMain } from "electron";
import * as fs from 'fs';

var fse = require('fs-extra');

//const { app, BrowserWindow } = require("electron");
const path = require("path");
const url = require("url");

let win;

app.on("ready", createWindow);

// initialize the app's main window
app.on("activate", () => {
  if (win === null) {
    createWindow();
  }
});

// on macOS, closing the window doesn't quit the app
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

function createWindow() {
  win = new BrowserWindow({ width: 800, height: 600 });

  // load the dist folder from Angular
  win.loadURL(
    url.format({
      pathname: path.join(__dirname, `../../dist/PlaFile3/index.html`),
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


}

//IPC_CODE https://stackoverflow.com/questions/11922383/access-process-nested-objects-arrays-or-json

ipcMain.on("getFiles", (event, arg:object) => {
  // console.log(arg);
  var n_filename = arg["filename"];
  console.log('filename = ' + n_filename); 

  var path_in = 'C:/Users/AlexRevay/Desktop' + arg["filepath"].replace("///","/\/");
  var n_filepath = path_in;
  console.log('filepath = ' + n_filepath);
  
  var filehome = arg["filehome"]
  console.log('fileorigin = ' + filehome);

  var filetype = filehome.split('.').pop();
  console.log('filetype', filetype);


  // var o_file = arg["files"][0]["relativePath"];
  // console.log('relative path = ' + o_file);
  
   
  fse.mkdirs(n_filepath , function(err){
  if (err) return console.error(err);
  
  console.log("success!")
    });


  var srcpath = filehome;
  console.log(srcpath);
  var dstpath = n_filepath + n_filename+'.'+filetype;
  console.log(dstpath);

  // With a callback:
  fse.move(srcpath, dstpath, err => {
  if (err) return console.error(err)

  console.log('success!')
})
 



});

ipcMain.on("getFiles", (event, arg) => {
  const files = fs.readdirSync(__dirname);
  win.webContents.send("getFilesResponse", arg);
  


});






