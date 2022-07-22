// Getting HTML Ids

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

let count = 0;

// let micState = false;
// let cameraState = true;
// let showing = true;
// let isMouseHover = false;

// Helper functions

// Constantly update states and stuff
async function UpdateStats() {
	const usage = await api.getCurrentLoad();
}

// Setting the mic icon
function setMic1() {
	// If the mic is muted and the symbol is already muted
	if (
		micCurrent === 'true' &&
		document.getElementById('mute').src.match('./static/images/muted.png')
	) {
		return;
	}

	// Else if the mic is unmuted and the symbol is already unmuted
	else if (
		micCurrent === 'false' &&
		document.getElementById('mute').src.match('./static/images/unmuted.png')
	) {
		return;
	}

	// Else if the mic is muted and the symbol is unmuted
	else if (
		micCurrent === 'true' &&
		document.getElementById('mute').src.match('./static/images/unmuted.png')
	) {
		document.getElementById('mute').src = './static/images/muted.png';
	}

	// Else if the mic is unmuted and the symbol is muted
	else if (
		micCurrent === 'false' &&
		document.getElementById('mute').src.match('./static/images/muted.png')
	) {
		document.getElementById('mute').src = './static/images/unmuted.png';
	}
}

// Setting the camera icon
function setCamera1() {
	// if the camera is on and the camera icon is on
	if (
		cameraCurrent === 'true' &&
		document.getElementById('camera').src.match('./static/images/cam-on.png')
	) {
		return;
	}

	// If the camera is off and the camera icon is off
	else if (
		cameraCurrent === 'false' &&
		document.getElementById('camera').src.match('./static/images/cam-off.png')
	) {
		return;
	}

	// If the camera is on and the camera icon is off
	else if (
		cameraCurrent === 'true' &&
		document.getElementById('camera').src.match('./static/images/cam-off.png')
	) {
		document.getElementById('camera').src = './static/images/cam-on.png';
	}

	// If the camera is off and the camera icon is on
	else if (
		cameraCurrent === 'false' &&
		document.getElementById('camera').src.match('./static/images/cam-on.png')
	) {
		document.getElementById('camera').src = './static/images/cam-off.png';
	}
}

function setMic2() {
	if (
		document.getElementById('mute').src.match('./static/images/unmuted.png')
	) {
		console.log('changed mute (was unmuted)');
		document.getElementById('mute').src = './static/images/muted.png';
	} else {
		console.log('changed mute (was muted)');
		document.getElementById('mute').src = './static/images/unmuted.png';
	}
	if (micCurrent === true) {
		document.getElementById('mute').src = './static/images/muted.png';
	} else if (micCurrent === false) {
		document.getElementById('mute').src = './static/images/unmuted.png';
	}
}

function setCamera2() {
	if (
		document.getElementById('camera').src.match('./static/images/cam-off.png')
	) {
		document.getElementById('camera').src = './static/images/cam-on.png';
	} else {
		document.getElementById('camera').src = './static/images/cam-off.png';
	}
}
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
		setMic2();
		// startCheckingMic();
		api.audio();
	});
}
if (VIDEO_BTN) {
	// Video button listener
	VIDEO_BTN.addEventListener('click', () => {
		console.log('video button clicked');
		// Set the camera icon (temporary)
		setCamera2();
		// startCheckingCamera();
		api.video();
	});
}

if (TOGGLE_SIDE_BAR) {
	// Toggling sidebar arrow listener
	TOGGLE_SIDE_BAR.addEventListener('mouseover', () => {
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
	BACKGROUND.addEventListener('mouseleave', () => {
		isMouseHover = false;
		if (isMouseHover === false) {
			window.localStorage.setItem('showing', false);
			api.toggleSideBar(window.localStorage.getItem('showing'));
		}
	});

	BACKGROUND.addEventListener('mousehover', () => {
		isMouseHover = true;
		if (isMouseHover === true) {
			window.localStorage.setItem('showing', true);
			api.toggleSideBar(window.localStorage.getItem('showing'));
		}
	});
}

let customMessage = 'hello from renderer';

const sendMessage = () => {
	api.sendMsg(customMessage);
	customMessage = '';
};

// Set the mic as soon as it launches
const recurseFor5Sec = setInterval(() => {
	setMic1();
	setCamera1();
	// console.log(count);
	count += 1;
	if (count > 50) {
		clearInterval(recurseFor5Sec);
		// console.log('killed');
	}
}, 100);

// Makes it so the back-end constantly gets their own update on zoom status
setInterval(() => {
	api.getActive();
}, 400);

// Updates the sending of the back-end status to the front-end
setInterval(() => {
	api.sendActive((data) => {
		zoomCurrent = data[0];
		micCurrent = data[1];
		cameraCurrent = data[2];
	});
}, 400);

function startCheckingMic() {
	setTimeout(() => {
		setMic1();
	}, 5000);
}

setInterval(() => {
	setMic1();
	setCamera1();
}, 6000);

function startCheckingCamera() {
	setTimeout(() => {
		setCamera1();
	}, 5000);
}

setInterval(UpdateStats, 1000);
