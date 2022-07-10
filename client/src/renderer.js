// Getting HTML Ids

// Close button
const CLOSE_BTN = document.getElementById('close');
// Audio button
const AUDIO_BTN = document.getElementById('audio');
// Video button
const VIDEO_BTN = document.getElementById('video');
// Toggle side bar arrow
const TOGGLE_SIDE_BAR = document.getElementById('toggle-side-bar');

async function UpdateStats() {
	const usage = await api.getCurrentLoad();
}

let showing = true;
window.localStorage.setItem('showing', showing);

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
		api.audio();
	});
}
if (VIDEO_BTN) {
	// Video button listener
	VIDEO_BTN.addEventListener('click', () => {
		console.log('video button clicked');
		api.video();
	});
}
if (TOGGLE_SIDE_BAR) {
	// Toggling sidebar arrow listener
	TOGGLE_SIDE_BAR.addEventListener('click', () => {
		if (window.localStorage.getItem('showing') == 'true') {
			window.localStorage.setItem('showing', false);
		} else {
			window.localStorage.setItem('showing', true);
		}
		// window.localStorage.setItem('showing', true);

		// console.log(window.localStorage.getItem('showing'));
		// window.localStorage.setItem(
		// 	'showing',
		// 	!Boolean(window.localStorage.getItem('showing'))
		// );
		// console.log(window.localStorage.getItem('showing'));
		api.toggleSideBar(window.localStorage.getItem('showing'));
	});
}

setInterval(UpdateStats, 1000);
