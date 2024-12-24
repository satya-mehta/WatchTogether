// WebSocket connection setup
let socket = new WebSocket('ws://localhost:8080'); 

socket.onopen = function () {
    console.log('Connected to WebSocket server');
};

socket.onmessage = function (event) {
    const message = JSON.parse(event.data);
    console.log('Received message:', message);

    // Send message to content script if it's a chat message
    if (message.type === 'chat') {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs[0]) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: displayChatMessage,
                    args: [message.content]
                });
            }
        });
    }

    // Handle other message types (e.g., playPause) as needed
};

socket.onerror = function (error) {
    console.error('WebSocket error:', error);
};

socket.onclose = function () {
    console.log('Disconnected from WebSocket server');
};

// Function to send messages to content script
function displayChatMessage(message) {
    const chatBox = document.getElementById('chat-box');
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight;  // Scroll to latest message
}
