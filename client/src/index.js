const { app, BrowserWindow } = require('electron');
const path = require('path');
require('electron-reload')(__dirname);
const { ipcRenderer, ipcMain } = require('electron');
var applescript = require("applescript");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	// Create the browser window.
	const mainWindow = new BrowserWindow({
		// width: 150,
		// height: 500,
		// maxHeight: 500,
		// minHeight: 500,
		// minWidth: 150,
		// maxWidth: 150,

		width: 500,
		height: 500,
		maxHeight: 500,
		minHeight: 500,
		minWidth: 500,
		maxWidth: 500,
		border: '1px black solid',
		frame: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			// devTools: false,
		},
		transparent: true,
		alwaysOnTop: true,
	});

	ipcMain.on('close-app', () => app.quit());

	// and load the index.html of the app.
	mainWindow.loadFile(path.join(__dirname, 'index.html'));

	// Open the DevTools.
	mainWindow.webContents.openDevTools();

	ipcMain.on('audio', () => {
		applescript.execFile("/Users/Temp/dev/courses/colab/Multitask/client/src/applescripts/zoomaudio.scpt", function(err, rtn) {
			if (err) {
				// Something went wrong!
				console.log("error")
			}
			if (rtn) {
				console.log(rtn);
			}
		})
	})

	ipcMain.on('video', () => {
		applescript.execFile("/Users/Temp/dev/courses/colab/Multitask/client/src/applescripts/zoomvideo.scpt", function(err, rtn) {
			if (err) {
				// Something went wrong!
				console.log("error")
			}
			if (rtn) {
				console.log(rtn);
			}
		})
	})
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
	if (process.platform !== 'darwin') {
		app.quit();
	}
});

app.on('activate', () => {
	// On OS X it's common to re-create a window in the app when the
	// dock icon is clicked and there are no other windows open.
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
