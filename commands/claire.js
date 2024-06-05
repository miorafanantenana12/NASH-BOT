const axios = require('axios');

module.exports = {
    name: 'claire',
    description: 'An AI command powered by Neuronspike, modified by joshua apostol',
    aliases: ['Claire'],
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const input = args.join(' ');

        if (!input) {
            api.sendMessage("Please provide a prompt for Mistral.", event.threadID);
            return;
        }

        api.sendMessage(`Processing your request...`, event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://liaspark.chatbotcommunity.ltd/@LianeAPI_Reworks/api/claire/?ask=${encodeURIComponent(input)}`);
            if (data && data.response) {
                api.sendMessage(data.response, event.threadID, event.messageID);
            } else {
                api.sendMessage("Unable to get a response from Mistral.", event.threadID, event.messageID);
                console.error('Unexpected API response:', data);
            }
        } catch (error) {
            api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
            console.error('Error making Mistral API request:', error);
        }
    },
};

