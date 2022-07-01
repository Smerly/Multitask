// scripts.js will hopefully be used to run our applescript files 
// (maybe through terminal/bash commands using "osascript zoomvideo.scpt")

// Event Listners for our html buttons that will be able to execute commands
audio.addEventListener('click', toggleMute)
video.addEventListener('click', toggleVideo)

function toggleMute() {
    alert('You clicked the mute button.')
}

function toggleVideo() {
    alert('You clicked the video button.')
}