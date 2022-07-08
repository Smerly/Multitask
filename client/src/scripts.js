// scripts.js will hopefully be used to run our applescript files 
// (maybe through terminal/bash commands using "osascript zoomvideo.scpt")

// Event Listners for our html buttons that will be able to execute commands

const applescript = require('applescript');

audio.addEventListener('click', toggleMute)
video.addEventListener('click', toggleVideo)

function toggleMute() {
    applescript.execFile("./applescripts/zoomaudio.applescript")
}

function toggleVideo() {
    applescript.execFile("./applescripts/zoomvideo.scpt")
}