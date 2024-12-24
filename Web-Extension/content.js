// Function to replace the YouTube secondary div with the chat interface
function replaceSecondaryWithChat() {
    const secondaryDiv = document.getElementById('secondary');
    if (secondaryDiv) {
        // Clear the secondary div
        secondaryDiv.innerHTML = '';

        // Create the new chat container div
        const chatContainer = document.createElement('div');
        chatContainer.id = 'chat-container';

        // Create chat box div
        const chatBox = document.createElement('div');
        chatBox.id = 'chat-box';

        // Create input for chat
        const chatInput = document.createElement('input');
        chatInput.type = 'text';
        chatInput.id = 'chat-input';
        chatInput.placeholder = 'Type a message...';

        // Create send message button
        const sendButton = document.createElement('button');
        sendButton.id = 'send-message';
        sendButton.textContent = 'Send';

        // Create mic button
        const micButton = document.createElement('button');
        micButton.id = 'mic-button';
        micButton.textContent = '🎤';

        // Append elements to the chat container
        chatContainer.appendChild(chatBox);
        chatContainer.appendChild(chatInput);
        chatContainer.appendChild(sendButton);
        chatContainer.appendChild(micButton);

        // Append the chat container to the secondary div
        secondaryDiv.appendChild(chatContainer);

        // Add event listeners after DOM elements are created
        addEventListeners();
    }
}

// Send chat message to the WebSocket server
function addEventListeners() {
    // Send message button
    const sendButton = document.getElementById('send-message');
    if (sendButton) {
        sendButton.addEventListener('click', function() {
            const chatInput = document.getElementById('chat-input');
            const message = chatInput.value.trim();
            if (message) {
                // Send the message over WebSocket to background
                chrome.runtime.sendMessage({ type: 'chat', content: message });
                chatInput.value = '';  // Clear the input field
            }
        });
    }

    // Mic button functionality (for voice chat, can be extended later with WebRTC or similar)
    const micButton = document.getElementById('mic-button');
    if (micButton) {
        micButton.addEventListener('click', function() {
            alert('Mic button clicked! Here, you can implement voice chat functionality.');
        });
    }
}

// Replace the YouTube secondary div with the chat interface once the content is loaded
replaceSecondaryWithChat();
