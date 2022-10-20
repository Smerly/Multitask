// Getting HTML Ids

// Close button
const CLOSE_BTN = document.getElementById('close');
// Audio button
const AUDIO_BTN = document.getElementById('audio');
// Video button
const VIDEO_BTN = document.getElementById('video');
// Share Screen button
const SHARE_SCREEN_BTN = document.getElementById('sharescreen');
// Toggle side bar arrow
const TOGGLE_SIDE_BAR = document.getElementById('toggle-side-bar');
// Keep side bar toggled with background
const BACKGROUND = document.getElementById('background-toggle');

// Helper vars

let micCurrent = false;
let cameraCurrent = false;
let shareCurrent = false;
let zoomCurrent = false;
let hoverStopOrContinue = false;
let isMainVisible = false;
let timeOutMic = null;
let timeOutCamera = null;

let count = 0;
let countResponse = 0;
let count2 = 0;

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
		document
			.getElementById('mute')
			.src.match('./static/images/Component-11-7.png')
	) {
		return;
	}

	// Else if the mic is unmuted and the symbol is already unmuted
	else if (
		micCurrent === 'false' &&
		document
			.getElementById('mute')
			.src.match('./static/images/Component-11-6.png')
	) {
		return;
	}

	// Else if the mic is muted and the symbol is unmuted
	else if (
		micCurrent === 'true' &&
		document
			.getElementById('mute')
			.src.match('./static/images/Component-11-6.png')
	) {
		document.getElementById('mute').src = './static/images/Component-11-7.png';
	}

	// Else if the mic is unmuted and the symbol is muted
	else if (
		micCurrent === 'false' &&
		document
			.getElementById('mute')
			.src.match('./static/images/Component-11-7.png')
	) {
		document.getElementById('mute').src = './static/images/Component-11-6.png';
	}
}

// Setting the camera icon
function setCamera1() {
	// if the camera is on and the camera icon is on
	if (
		cameraCurrent === 'true' &&
		document
			.getElementById('camera')
			.src.match('./static/images/Component-11-4.png')
	) {
		return;
	}

	// If the camera is off and the camera icon is off
	else if (
		cameraCurrent === 'false' &&
		document
			.getElementById('camera')
			.src.match('./static/images/Component-11-5.png')
	) {
		return;
	}

	// If the camera is on and the camera icon is off
	else if (
		cameraCurrent === 'true' &&
		document
			.getElementById('camera')
			.src.match('./static/images/Component-11-5.png')
	) {
		document.getElementById('camera').src =
			'./static/images/Component-11-4.png';
	}

	// If the camera is off and the camera icon is on
	else if (
		cameraCurrent === 'false' &&
		document
			.getElementById('camera')
			.src.match('./static/images/Component-11-4.png')
	) {
		document.getElementById('camera').src =
			'./static/images/Component-11-5.png';
	}
}

function setShareScreen1() {
	if (shareCurrent === 'false') {
		document.getElementById('sharescreenicon').src =
			'./static/images/notshared.png';
	} else if (shareCurrent === 'true') {
		document.getElementById('sharescreenicon').src =
			'./static/images/shared.png';
	}
}

function setMic2() {
	if (
		document
			.getElementById('mute')
			.src.match('./static/images/Component-11-6.png')
	) {
		console.log('changed mute (was unmuted)');
		document.getElementById('mute').src = './static/images/Component-11-7.png';
	} else {
		console.log('changed mute (was muted)');
		document.getElementById('mute').src = './static/images/Component-11-6.png';
	}
	if (micCurrent === true) {
		document.getElementById('mute').src = './static/images/Component-11-7.png';
	} else if (micCurrent === false) {
		document.getElementById('mute').src = './static/images/Component-11-6.png';
	}
}

function setCamera2() {
	if (
		document
			.getElementById('camera')
			.src.match('./static/images/Component-11-5.png')
	) {
		document.getElementById('camera').src =
			'./static/images/Component-11-4.png';
	} else {
		document.getElementById('camera').src =
			'./static/images/Component-11-5.png';
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
		startCheckingMic();
		api.audio();
	});
}
// Video button listener
if (VIDEO_BTN) {
	VIDEO_BTN.addEventListener('click', () => {
		console.log('video button clicked');
		// Set the camera icon (temporary)
		setCamera2();
		startCheckingCamera();
		api.video();
	});
}

if (SHARE_SCREEN_BTN) {
	SHARE_SCREEN_BTN.addEventListener('click', () => {
		console.log('share screen button clicked');
		api.sharescreen();
	});
}
// Toggling sidebar arrow listener
if (TOGGLE_SIDE_BAR) {
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

// If hovering over the background
if (BACKGROUND) {
	BACKGROUND.addEventListener('mouseover', () => {
		checked = true;
	});
	BACKGROUND.addEventListener('mouseleave', () => {
		console.log('hi');
		window.localStorage.setItem('showing', false);
		countResponse = 0;

		api.toggleSideBar(window.localStorage.getItem('showing'));
		// }
	});

	// BACKGROUND.addEventListener('mousehover', () => {
	// 	window.localStorage.setItem('showing', true);

	// 	// hoverStopOrContinue = true;

	// 	api.toggleSideBar(window.localStorage.getItem('showing'));
	// 	// }
	// });
}
setInterval(() => {
	if (isMainVisible == true && countResponse == 0) {
		const recurseFor5Sec = setInterval(() => {
			setMic1();
			setCamera1();

			countResponse += 1;
			if (countResponse > 15) {
				clearInterval(recurseFor5Sec);
			}
		}, 100);
	}
});

// Set the mic as soon as it launches
const beginAppSet = setInterval(() => {
	setMic1();
	setCamera1();
	// console.log(count);
	count += 1;
	if (count > 50) {
		clearInterval(beginAppSet);
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
		zoomCurrent = data.rtn[0];
		micCurrent = data.rtn[1];
		cameraCurrent = data.rtn[2];
		shareCurrent = data.rtn[3];
		isMainVisible = data.isVisible;
		// console.log(data.rtn[3]);
	});
}, 400);

// Start Checking

function startCheckingMic() {
	clearTimeout(timeOutMic);
	timeOutMic = setTimeout(() => {
		console.log('checked mic 2 sec after click');
		setMic1();
	}, 1900);
}

setInterval(() => {
	setShareScreen1();
}, 700);

function startCheckingCamera() {
	clearTimeout(timeOutCamera);
	timeOutCamera = setTimeout(() => {
		setCamera1();
	}, 2000);
}

setInterval(UpdateStats, 1000);
