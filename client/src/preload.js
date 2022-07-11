const { contextBridge, ipcRenderer } = require('electron');
const { currentLoad } = require('systeminformation');

// Actions to be messaged to index.js to execute
contextBridge.exposeInMainWorld('api', {
	// Close app action

	close: () => ipcRenderer.send('close-app'),
	getCurrentLoad: () => currentLoad(),

	// Mute and Video actions

	audio: () => ipcRenderer.send('audio'),
	video: () => ipcRenderer.send('video'),

	// Toggle the side bar

	toggleSideBar: (showing) => ipcRenderer.send('toggle-side-bar', showing),
});
