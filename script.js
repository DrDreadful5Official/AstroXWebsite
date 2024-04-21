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

        // Replace 'YOUR_DISCORD_WEBHOOK_URL_HERE' with your actual Discord webhook URL
        var webhookUrl = 'https://discord.com/api/webhooks/1231425931453792256/zDbYK2ISGhEl32ory64ubBIB3jv0oPibP5XW1MZA7ztB32zvvZdVyzGBM2_yGimCi5Td';

        // Send a message to Discord webhook including the geolocation information
        var message = `Someone visited the website from ${city}, ${region}, ${country}. Internet provider: ${isp}. Postal Code: ${postalCode}. IP Address: ${clientIp}`;
        sendMessageToDiscord(webhookUrl, message);
      })
      .catch(error => {
        console.error('Error fetching geolocation information:', error);
      });
  })
  .catch(error => {
    console.error('Error fetching IP address:', error.message);
  });

function sendMessageToDiscord(webhookUrl, message) {
  fetch(webhookUrl, {
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