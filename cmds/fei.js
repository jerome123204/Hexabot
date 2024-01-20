const axios = require('axios');
const fs = require('fs');
const request = require('request');
const path = require('path');

async function fei(event, api) {
  const input = event.body.toLowerCase().trim();
  if (input.includes("-help")) {
    const usage = "Usage: fei [prompt]\n\n" +
      "Description: ai by kazuma\n\n" +
      "Example: ai hi";
    api.sendMessage(usage, event.threadID);
    return;
  }

  const title = input.slice(7);

  axios
    .get(`https://scp-09.onrender.com/api/gpt?query=${title}`)
    .then(response => {

      const result = response.data.result;
      const message = `HexaClub "${result.result}"`;
      
        api.sendMessage({
          body: message,
        }, event.threadID);
      });
    })
    .catch(error => {
      console.error(error);
      api.sendMessage("Error while fetching lyrics and image. Please try again later.", event.threadID);
    });
}

module.exports = fei;
    
