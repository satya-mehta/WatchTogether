// content.js
let socket = new WebSocket('ws://localhost:8080'); // WebSocket server connection

socket.onopen = function () {
  console.log('Connected to WebSocket server');
};

socket.onmessage = function (event) {
  const message = JSON.parse(event.data);
  const video = document.querySelector('video');

  if (message.action === 'play') {
    video.play();
  } else if (message.action === 'pause') {
    video.pause();
  } else if (message.action === 'seek') {
    video.currentTime = message.time;
  }
};

// Detect video actions (play, pause, seek)
const video = document.querySelector('video');

video.addEventListener('play', () => {
  socket.send(JSON.stringify({ action: 'play' }));
});

video.addEventListener('pause', () => {
  socket.send(JSON.stringify({ action: 'pause' }));
});

video.addEventListener('seeked', () => {
  socket.send(JSON.stringify({ action: 'seek', time: video.currentTime }));
});
