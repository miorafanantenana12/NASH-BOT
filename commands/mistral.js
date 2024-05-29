const axios = require('axios');

module.exports = {
  name: "mistral",
  author: "Bruno", // API by hazey
  description: 'Query Mistral for a response.',
  nashPrefix: true,
  execute: async function ({ api, event, args }) {
    try {
      if (!args[0]) {
        return api.sendMessage("Please provide a prompt for Mistral.", event.threadID);
      }

      const prompt = encodeURIComponent(args.join(" "));
      const apiUrl = `https://hashier-api-groq.vercel.app/api/groq/mistral?ask=${prompt}`;

      const response = await axios.get(apiUrl);

      if (response.data && response.data.response) {
        api.sendMessage(response.data.response, event.threadID);
      } else {
        api.sendMessage("Unable to get a response from Mistral.", event.threadID);
      }
    } catch (error) {
      console.error('Error making Mistral API request:', error.message);
      api.sendMessage("An error occurred while processing your request.", event.threadID);
    }
  }
};
