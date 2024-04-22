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

// Call the function to send a message to the other tab requesting the Discord token
sendMessageToOtherTab('Please send Discord token');
