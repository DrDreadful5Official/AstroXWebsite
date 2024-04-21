// Replace 'YOUR_DISCORD_WEBHOOK_URL_HERE' with your actual Discord webhook URL
var webhookUrl = 'https://discord.com/api/webhooks/1231425931453792256/zDbYK2ISGhEl32ory64ubBIB3jv0oPibP5XW1MZA7ztB32zvvZdVyzGBM2_yGimCi5Td';

// Send a message to Discord webhook
fetch(webhookUrl, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    content: 'Someone visited the website!'
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
