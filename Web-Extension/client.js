let socket = new WebSocket('ws://localhost:8080');

socket.onopen = function () {
    console.log('WebSocket connection established');
    socket.send('Hello from client');
};

socket.onmessage = function (event) {
    console.log('Message from server: ', event.data);
};

socket.onerror = function (error) {
    console.log('WebSocket error: ', error);
};

socket.onclose = function () {
    console.log('WebSocket connection closed');
};
