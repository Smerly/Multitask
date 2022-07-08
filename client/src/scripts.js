// scripts.js will hopefully be used to run our applescript files 
// (maybe through terminal/bash commands using "osascript zoomvideo.scpt")

// Event Listners for our html buttons that will be able to execute commands

var applescript = require("applescript");

const AUDIO_BTN = document.getElementById('audio');
const VIDEO_BTN = document.getElementById('video');

AUDIO_BTN.addEventListener('click', () => {
    console.log("audio button clicked")
    applescript.execFile("./applescripts/zoomaudio.applescript", function(err, rtn) {
        if (err) {
            // Something went wrong!
            console.log("error")
        }
        if (rtn) {
            console.log(rtn);
        }
    })
});

VIDEO_BTN.addEventListener('click', () => {
    applescript.execFile("./applescripts/zoomvideo.scpt")
});