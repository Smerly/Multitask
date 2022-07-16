// Getting HTML Ids

const { ipcRenderer } = require('electron');

// Close button
const CLOSE_BTN = document.getElementById('close');
// Audio button
const AUDIO_BTN = document.getElementById('audio');
// Video button
const VIDEO_BTN = document.getElementById('video');
// Toggle side bar arrow
const TOGGLE_SIDE_BAR = document.getElementById('toggle-side-bar');
// Keep side bar toggled with background
const BACKGROUND = document.getElementById('background-toggle');

// Helper vars

let micCurrent = false;
let cameraCurrent = false;
let zoomCurrent = false;

// let micState = false;
// let cameraState = true;
// let showing = true;
// let isMouseHover = false;

// Helper functions

// Constantly update states and stuff
async function UpdateStats() {
	const usage = await api.getCurrentLoad();
}

// ipcRenderer.on('send-active', (evt, message) => {
// 	console.log(message);
// });

// Setting the mic icon
function setMic() {
	if (
		document.getElementById('mute').src.match('./static/images/unmuted.png')
	) {
		console.log('changed mute (was unmuted)');
		document.getElementById('mute').src = './static/images/muted.png';
	} else {
		console.log('changed mute (was muted)');
		document.getElementById('mute').src = './static/images/unmuted.png';
	}
}

// Setting the camera icon
function setCamera() {
	if (
		document.getElementById('camera').src.match('./static/images/cam-off.png')
	) {
		document.getElementById('camera').src = './static/images/cam-on.png';
	} else {
		document.getElementById('camera').src = './static/images/cam-off.png';
	}
}

// window.localStorage.setItem('showing', showing);

// Event Listeners (Where actions from preload are called)

// Close button listener
if (CLOSE_BTN) {
	CLOSE_BTN.addEventListener('click', () => {
		api.close();
	});
}
// Audio button listener
if (AUDIO_BTN) {
	AUDIO_BTN.addEventListener('click', () => {
		console.log('audio button clicked');
		// Set the mic icon (temporary)
		setMic();
		api.audio();
	});
}
if (VIDEO_BTN) {
	// Video button listener
	VIDEO_BTN.addEventListener('click', () => {
		console.log('video button clicked');
		// Set the camera icon (temporary)
		setCamera();
		api.video();
	});
}

if (TOGGLE_SIDE_BAR) {
	// Toggling sidebar arrow listener
	TOGGLE_SIDE_BAR.addEventListener('mouseover', () => {
		// if (window.localStorage.getItem('showing') == 'true') {
		// 	window.localStorage.setItem('showing', false);
		// } else {
		// 	window.localStorage.setItem('showing', true);
		// }
		// api.toggleSideBar(window.localStorage.getItem('showing'));

		// api.toggleSideBar(window.localStorage.getItem('showing'));
		isMouseHover = true;

		if (isMouseHover === true) {
			if (window.localStorage.getItem('showing') == 'true') {
				window.localStorage.setItem('showing', false);
			} else {
				window.localStorage.setItem('showing', true);
			}
			api.toggleSideBar(window.localStorage.getItem('showing'));

			api.toggleSideBar(window.localStorage.getItem('showing'));
		}
	});
}

if (BACKGROUND) {
	// BACKGROUND.addEventListener('mouseout', () => {
	// 	console.log('hovered');
	// 	window.localStorage.setItem('showing', false);
	// 	api.toggleSideBar(window.localStorage.getItem('showing'));
	// });
	BACKGROUND.addEventListener('mouseleave', () => {
		isMouseHover = false;
		console.log('background is left');
		if (isMouseHover === false) {
			window.localStorage.setItem('showing', false);
			api.toggleSideBar(window.localStorage.getItem('showing'));
		}
	});

	BACKGROUND.addEventListener('mousehover', () => {
		isMouseHover = true;
		console.log('background is hovering');
		if (isMouseHover === true) {
			window.localStorage.setItem('showing', true);
			api.toggleSideBar(window.localStorage.getItem('showing'));
		}
	});
}

// Makes it so it constantly checks the current statuses

// setInterval(() => {
// 	api.getActive();
// }, 1000);

setInterval(UpdateStats, 1000);
