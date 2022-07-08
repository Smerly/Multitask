const CLOSE_BTN = document.getElementById('close');

async function UpdateStats() {
	const usage = await api.getCurrentLoad();
	// I can get stuffs from preload.js to here for the zoom meeting stuff later
}
CLOSE_BTN.addEventListener('click', () => {
	api.close();
});

const AUDIO_BTN = document.getElementById('audio');
const VIDEO_BTN = document.getElementById('video');

AUDIO_BTN.addEventListener('click', () => {
    console.log("audio button clicked");

	api.audio();
});

VIDEO_BTN.addEventListener('click', () => {
    console.log("video button clicked");

	api.video();
});


setInterval(UpdateStats, 1000);
