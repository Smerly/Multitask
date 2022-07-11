const { app, BrowserWindow } = require('electron');
const path = require('path');
require('electron-reload')(__dirname);
const { ipcRenderer, ipcMain, screen } = require('electron');
var applescript = require('applescript');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
// eslint-disable-next-line global-require
if (require('electron-squirrel-startup')) {
	app.quit();
}

const createWindow = () => {
	// Calculating the width and height of the user's screen
	const { width, height } = screen.getPrimaryDisplay().workAreaSize;

	// Browser windows

	// Initial arrow window
	const arrowWindow = new BrowserWindow({
		width: 30,
		height: 70,

		// width: 500,
		// height: 500,
		// maxHeight: 500,
		// minHeight: 500,
		// minWidth: 500,
		// maxWidth: 500,
		border: '1px black solid',
		frame: false,
		autoHideMenuBar: true,
		webPreferences: {
			devTools: false,
			preload: path.join(__dirname, 'preload.js'),
		},
		transparent: true,
		alwaysOnTop: true,
		x: -width,
		y: Math.floor(height / 2),
	});
	// Main window
	const mainWindow = new BrowserWindow({
		// width: 150,
		// height: 500,
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
		// show: false,
		x: -width,
		y: Math.floor(height / 4),
	});

	// Initial loading of HTML files
	arrowWindow.loadFile(path.join(__dirname, 'index.html'));
	mainWindow.loadFile(path.join(__dirname, 'main.html'));
	// Make the main window initially not show up
	mainWindow.hide();

	// All ipcMains

	// Closing app method
	ipcMain.on('close-app', () => app.quit());

	// Toggling side bar method
	ipcMain.on('toggle-side-bar', (event, arg) => {
		console.log(`${typeof arg}: ${arg}`);
		// If the sidebar was previously hidden, then show it
		if (arg === 'true') {
			console.log('shown');
			mainWindow.show();
			arrowWindow.hide();
		}
		// If the sidebar was previously shown, then hide it
		else if (arg === 'false') {
			console.log('hidden');
			mainWindow.hide();
			arrowWindow.show();
		}
	});

	// Muting and unmuting methods
	ipcMain.on('audio', () => {
		applescript.execFile(
			__dirname + '/applescripts/zoomaudio.scpt',
			function (err, rtn) {
				if (err) {
					// Something went wrong!
					console.log(err);
				}
				if (rtn) {
					console.log(rtn);
				}
			}
		);
	});

	// Turning on video and turning off vide methods
	ipcMain.on('video', () => {
		applescript.execFile(
			__dirname + '/applescripts/zoomvide.scpt',
			function (err, rtn) {
				if (err) {
					// Something went wrong!
					console.log('error');
				}
				if (rtn) {
					console.log(rtn);
				}
			}
		);
	});
	// Open the DevTools.
	arrowWindow.webContents.openDevTools();
};

// Run main function when the app is ready ton start
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
