// Listen for messages from the main tab
window.addEventListener('message', function(event) {
    // Verify that the message is from a trusted origin
    if (event.origin !== window.origin) {
        console.error('Received message from untrusted origin:', event.origin);
        return;
    }

    // Check if the message is a request for the Discord token
    if (event.data.type === 'getDiscordToken') {
        // Retrieve the Discord token from local storage
        var discordToken = localStorage.getItem('discordToken');

        // Send the Discord token back to the main tab
        event.source.postMessage({ type: 'sendDiscordToken', token: discordToken }, event.origin);
    }
});
