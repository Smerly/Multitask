const CLOSE_BTN = document.getElementById('close');

async function UpdateStats() {
	const usage = await api.getCurrentLoad();
	// I can get stuffs from preload.js to here for the zoom meeting stuff later
}
CLOSE_BTN.addEventListener('click', () => {
	api.close();
});
setInterval(UpdateStats, 1000);
