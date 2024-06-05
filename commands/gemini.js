const axios = require('axios');

module.exports = {
    name: 'gemini',
    description: 'An AI command powered by Neuronspike, modified by joshua apostol',
    aliases: ['Gemini'],
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
            const { data } = await axios.get(`https://liaspark.chatbotcommunity.ltd/@hercai/api/gemini?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name%20||%20%22a%20user%22)}&query=${encodeURIComponent(input)}`);
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

