const { contextBridge, ipcRenderer } = require('electron');
const { currentLoad } = require('systeminformation');

contextBridge.exposeInMainWorld('api', {
	close: () => ipcRenderer.send('close-app'),
	getCurrentLoad: () => currentLoad(),
	audio: () => ipcRenderer.send('audio'),
	video: () => ipcRenderer.send('video')
});