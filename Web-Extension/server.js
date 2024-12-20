// server/server.js
const WebSocket = require('ws');

// Create a WebSocket server
const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', (ws) => {
    console.log('A new client has connected');

    // When a message is received from a client (video action)
    ws.on('message', (message) => {
        console.log('Received message:', message);

        // Broadcast the message to all other clients
        wss.clients.forEach((client) => {
            if (client !== ws && client.readyState === WebSocket.OPEN) {
                client.send(message);
            }
        });
    });

    // When a client disconnects
    ws.on('close', () => {
        console.log('A client has disconnected');
    });
});

console.log('WebSocket server is running on ws://localhost:8080');
