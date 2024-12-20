// Establish a WebSocket connection to the server
const socket = new WebSocket('ws://localhost:8080'); // Change to your server's URL

// On WebSocket open
socket.addEventListener('open', function (event) {
    console.log("Connected to WebSocket server");
});

// Listen for incoming messages from the WebSocket server
socket.onmessage = (event) => {
    const data = JSON.parse(event.data); // Parse the incoming JSON message
    
    // Get the YouTube video player
    const player = document.querySelector('video');
    
    // Synchronize actions based on received data
    if (data.action === 'play') {
        player.play(); // Play the video
    }
    if (data.action === 'pause') {
        player.pause(); // Pause the video
    }
    if (data.action === 'seek') {
        player.currentTime = data.timestamp; // Seek to the specified time
    }
};

// Example of sending play/pause/seek events to the server
const player = document.querySelector('video');

// When play button is pressed
player.addEventListener('play', () => {
    const message = {
        action: 'play', // Action type
        timestamp: player.currentTime // Send the current time
    };
    socket.send(JSON.stringify(message)); // Send the message to the WebSocket server
});

// When pause button is pressed
player.addEventListener('pause', () => {
    const message = {
        action: 'pause',
        timestamp: player.currentTime
    };
    socket.send(JSON.stringify(message));
});

// When the video is seeked
player.addEventListener('seeked', () => {
    const message = {
        action: 'seek',
        timestamp: player.currentTime
    };
    socket.send(JSON.stringify(message)); // Send new timestamp
});
