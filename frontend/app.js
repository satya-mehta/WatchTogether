const socket = io();
console.log("Connected to the Server");

let player; // Declare globally

function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
        height: '390',
        width: '640',
        playerVars: {
            listType: 'playlist',
            list: 'PLAYLIST_ID', // Replace with your playlist ID
            autoplay: 1,        // Auto-plays videos
            controls: 1,        // Show YouTube controls
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
        },
    });
}

function onPlayerReady(event) {
    event.target.playVideo(); // Auto-play the video on ready
}

function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
        player.nextVideo(); // Play the next video when the current one ends
    }
}

// Custom controls
function playVideo() {
    player.playVideo();
}

function pauseVideo() {
    player.pauseVideo();
}

function nextVideo() {
    player.nextVideo();
}

function previousVideo() {
    player.previousVideo();
}
