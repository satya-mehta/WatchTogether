// background.js
let socket = new WebSocket('ws://localhost:8080'); 

socket.onopen = function () {
    console.log('Connected to WebSocket server');
};

socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    console.log('Received message:', message);
    // Add further processing of the message here
};

socket.onerror = function (error) {
    console.error('WebSocket error:', error);
};

socket.onclose = function () {
    console.log('Disconnected from WebSocket server');
};
