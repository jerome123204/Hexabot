const axios = require('axios');
const request = require('request');

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

  try {
    const response = await axios.get(`https://scp-09.onrender.com/api/gpt?query=${title}`);
    const result = response.data.result;
    const message = `HexaClub ${result}`;

    api.sendMessage({
      body: message,
    }, event.threadID);
  } catch (error) {
    console.error(error);
    api.sendMessage("Error while fetching ai. Please try again later.", event.threadID);
  }
}

module.exports = fei;
