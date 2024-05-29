const axios = require('axios');

module.exports = {
    name: "gpt4",
    author: "Bruno", // API by hazey
    description: 'Query GPT-4 for a response.',
    nashPrefix: true,
    execute: async (api, event, args) => {
        const input = args.join(' ');

        if (!input) {
            api.sendMessage("Please provide a prompt for GPT-4.", event.threadID, event.messageID);
            return;
        }

        try {
            const response = await axios.get(`https://deku-rest-api.vercel.app/new/gpt-4_adv?prompt=${encodeURIComponent(input)}`);
            const output = response.data.response;

            if (output) {
                api.sendMessage(output, event.threadID, event.messageID);
            } else {
                api.sendMessage("Unable to get a response from GPT-4.", event.threadID, event.messageID);
            }
        } catch (error) {
            console.error('Error making GPT-4 API request:', error);
            api.sendMessage("An error occurred while processing your request. Please try again later.", event.threadID, event.messageID);
        }
    }
};
