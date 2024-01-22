const axios = require('axios');
const fs = require('fs');
const request = require('request');
const path = require('path');

async function lyrics(event, api) {
  const input = event.body.toLowerCase().trim();
  if (input.includes("-help")) {
    const usage = "Usage: lyrics [song title]\n\n" +
      "Description: Retrieves the lyrics of a song and sends them along with the song's image.\n\n" +
      "Example: lyrics Yesterday by The Beatles";
    api.sendMessage(usage, event.threadID);
    return;
  }

  const title = input.slice(7);

  axios
    .get(`https://cyni-gpt-api.onrender.com/ask?q=${title}`)
    .then(response => {

      const result = response.data.response;
      const message = `Ai "${result.s_response}`;
      const imagePath = path.join(__dirname, '../temp/lyrics.jpg');

      request(result.s_image).pipe(fs.createWriteStream(imagePath)).on('finish', () => {
        api.sendMessage({
          body: message,
          attachment: fs.createReadStream(imagePath)
        }, event.threadID);
      });
    })
    .catch(error => {
      console.error(error);
      api.sendMessage("Error while fetching lyrics and image. Please try again later.", event.threadID);
    });
}

module.exports = lyrics;
