const { app, BrowserWindow, webContents } = require('electron');
const path = require('path');
require('electron-reload')(__dirname);
const { ipcMain, screen } = require('electron');
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
		// Production sizing
		width: 20,
		height: 300,

		// Dev sizing
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
		// x: -width,
		// y: Math.floor(height / 2.5),
		x: -width,
		y: Math.floor(height / 2.5),
	});

	const arrowWindow2 = new BrowserWindow({
		// Production sizing
		width: 300,
		height: 20,
		// width: 300,
		// height: 20,

		// Dev sizing
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
			// devTools: false,
			preload: path.join(__dirname, 'preload.js'),
		},
		transparent: true,
		alwaysOnTop: true,
		// x: -width,
		// y: Math.floor(height / 2.5),
		x: Math.floor(height / 2.5),
		y: -width,
	});

	const arrowWindow3 = new BrowserWindow({
		// Production sizing
		// width: 20,
		// height: 300,
		// width: 300,
		// height: 20,

		// Dev sizing
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
			// devTools: false,
			preload: path.join(__dirname, 'preload.js'),
		},
		transparent: true,
		alwaysOnTop: true,
		// x: -width,
		// y: Math.floor(height / 2.5),
		x: Math.floor(height / 2.5),
		y: -width,
	});

	const arrowWindow4 = new BrowserWindow({
		// Production sizing
		// width: 20,
		// height: 300,
		// width: 300,
		// height: 20,

		// Dev sizing
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
			// devTools: false,
			preload: path.join(__dirname, 'preload.js'),
		},
		transparent: true,
		alwaysOnTop: true,
		// x: -width,
		// y: Math.floor(height / 2.5),
		x: Math.floor(height / 2.5),
		y: -width,
	});
	// Main window
	const mainWindow = new BrowserWindow({
		// Production sizing
		width: 150,
		height: 510,
		minWidth: 150,
		maxWidth: 150,

		// Dev sizing
		// width: 500,
		// height: 510,
		// maxHeight: 510,
		// minHeight: 510,
		// minWidth: 500,
		// maxWidth: 500,

		border: '1px black solid',
		frame: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			// nodeIntegration: true,
			// contextIsolation: false,
			devTools: false,
		},
		transparent: true,
		alwaysOnTop: true,
		// show: false,
		x: -width,
		y: Math.floor(height / 4),
	});
	const mainWindow2 = new BrowserWindow({
		// Production sizing
		// width: 520,
		// height: 150,
		// minWidth: 150,
		// maxWidth: 150,

		// Dev sizing
		width: 1000,
		height: 510,
		maxHeight: 510,
		minHeight: 510,
		minWidth: 500,
		maxWidth: 500,

		border: '1px black solid',
		frame: false,
		autoHideMenuBar: true,
		webPreferences: {
			preload: path.join(__dirname, 'preload.js'),
			// nodeIntegration: true,
			// contextIsolation: false,
			// devTools: false,
		},
		transparent: true,
		alwaysOnTop: true,
		// show: false,
		x: Math.floor(height / 4),
		y: -width,
	});

	// Initial loading of HTML files
	arrowWindow.loadFile(path.join(__dirname, 'index.html'));
	mainWindow.loadFile(path.join(__dirname, 'main.html'));
	arrowWindow2.loadFile(path.join(__dirname, 'pullbar2.html'));
	mainWindow2.loadFile(path.join(__dirname, 'main2.html'));
	// Make the main window initially not show up
	mainWindow.hide();
	mainWindow2.hide();
	// arrowWindow2.hide();
	// dev things:
	// arrowWindow.hide();
	arrowWindow.show();
	arrowWindow2.hide();
	arrowWindow3.hide();
	arrowWindow4.hide();
	// mainWindow.show();

	// All ipcMains

	// Closing app method
	ipcMain.on('close-app', () => app.quit());

	// Toggling side bar method
	ipcMain.on('toggle-side-bar', (event, arg) => {
		// console.log(`${typeof arg}: ${arg}`);
		// If the sidebar was previously hidden, then show it
		if (arg === 'true') {
			// console.log('shown');
			mainWindow.show();
			arrowWindow.hide();
		}
		// If the sidebar was previously shown, then hide it
		else if (arg === 'false') {
			// console.log('hidden');
			mainWindow.hide();
			arrowWindow.show();
		}
	});

	ipcMain.on('toggle-side-bar2', (event, arg) => {
		// console.log(`${typeof arg}: ${arg}`);
		// If the sidebar was previously hidden, then show it
		if (arg === 'true') {
			// console.log('shown');
			mainWindow2.show();
			arrowWindow2.hide();
		}
		// If the sidebar was previously shown, then hide it
		else if (arg === 'false') {
			// console.log('hidden');
			mainWindow2.hide();
			arrowWindow2.show();
		}
	});

	let isRunningAudio = false;
	let isRunningCamera = false;

	// Muting and unmuting methods
	ipcMain.on('audio', () => {
		if (isRunningAudio) {
			return;
		}

		isRunningAudio = true;
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
				isRunningAudio = false;
			}
		);
	});
	// Turning on video and turning off vide methods
	ipcMain.on('video', () => {
		if (isRunningCamera) {
			return;
		}
		isRunningCamera = true;
		applescript.execFile(
			__dirname + '/applescripts/zoomvideo.scpt',
			function (err, rtn) {
				if (err) {
					// Something went wrong!
					console.log(err);
				}
				if (rtn) {
					console.log(rtn);
				}
				isRunningCamera = false;
			}
		);
	});

	ipcMain.on('get-active', () => {
		applescript.execFile(
			__dirname + '/applescripts/zoomstatus.scpt',
			function (err, rtn) {
				if (err) {
					// Something went wrong!
					console.log(err);
				}
				if (rtn) {
					/*
				rtn[0] -- true: in a zoom meeting / false: not in a zoom meeting	<------- MAY BE REFERENCED FOR FUTURE FEATURE
				rtn[1] -- true: muted / false: unmuted
				rtn[2] -- true: video on / false: video off
				*/
					mainWindow.webContents.send('send-active', {
						rtn: rtn,
						isVisible: mainWindow.isVisible(),
					});
				}
			}
		);
	});
	// Open the DevTools.
	arrowWindow.webContents.openDevTools();
	mainWindow2.webContents.openDevTools();
};

// Run main function when the app is ready to start
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
