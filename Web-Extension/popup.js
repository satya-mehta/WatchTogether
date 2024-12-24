document.addEventListener('DOMContentLoaded', function () {
    const startStopButton = document.getElementById('start-stop-btn');

    // Add click event listener to toggle start/stop
    startStopButton.addEventListener('click', function () {
        if (startStopButton.classList.contains('stop')) {
            // If the button is in "stop" state, stop the extension
            stopExtension();
        } else {
            // If the button is in "start" state, start the extension
            startExtension();
        }
    });

    function startExtension() {
        // Change button text and style for "Stop" state
        startStopButton.textContent = 'Stop';
        startStopButton.classList.add('stop');
        startStopButton.classList.remove('button');

        // Send a message to the content script to replace the div
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0 && tabs[0].id) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: replaceSecondaryWithChat
                }).catch((err) => {
                    console.error('Error executing script:', err);
                });
            } else {
                console.error("No active tab found!");
            }
        });
    }

    function stopExtension() {
        // Change button text and style for "Start" state
        startStopButton.textContent = 'Start';
        startStopButton.classList.remove('stop');
        startStopButton.classList.add('button');

        // Optionally, you can add logic here to revert changes on the YouTube page if needed
        // e.g., reset the div or remove the chat interface.
        chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
            if (tabs.length > 0 && tabs[0].id) {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    func: resetSecondaryDiv
                }).catch((err) => {
                    console.error('Error executing script:', err);
                });
            } else {
                console.error("No active tab found!");
            }
        });
    }

    // Function to replace the secondary div with chat interface (for testing purpose)
    function replaceSecondaryWithChat() {
        const secondaryDiv = document.getElementById('secondary');
        if (secondaryDiv) {
            secondaryDiv.innerHTML = ''; // Clear the current content

            const chatContainer = document.createElement('div');
            chatContainer.id = 'chat-container';

            const chatBox = document.createElement('div');
            chatBox.id = 'chat-box';

            const chatInput = document.createElement('input');
            chatInput.type = 'text';
            chatInput.id = 'chat-input';
            chatInput.placeholder = 'Type a message...';

            const sendButton = document.createElement('button');
            sendButton.id = 'send-message';
            sendButton.textContent = 'Send';

            const micButton = document.createElement('button');
            micButton.id = 'mic-button';
            micButton.textContent = '🎤';

            chatContainer.appendChild(chatBox);
            chatContainer.appendChild(chatInput);
            chatContainer.appendChild(sendButton);
            chatContainer.appendChild(micButton);

            secondaryDiv.appendChild(chatContainer);
        }
    }

    // Function to reset the secondary div (optional for stopping)
    function resetSecondaryDiv() {
        const secondaryDiv = document.getElementById('secondary');
        if (secondaryDiv) {
            secondaryDiv.innerHTML = ''; // Clear the content or revert changes
        }
    }
});