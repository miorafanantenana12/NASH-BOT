const axios = require('axios');

module.exports = {
    name: 'blackbox',
    description: 'A command powered by the Blackbox API',
    aliases: ['box'],
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const input = args.join(' ');

        if (!input) {
            api.sendMessage(
                `Hello there!\n\nI am a chatbot powered by the Blackbox API. I am here to assist you with any questions or tasks you may have.\n\nUsage: blackbox [your question]`,
                event.threadID,
                event.messageID
            );
            return;
        }

        api.sendMessage(`Processing your request...`, event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://api.easy-api.online/api/blackbox?query=${encodeURIComponent(input)}`);
            const response = data.result;

            const finalResponse = `🔍 Blackbox says: ${response}`;
            api.sendMessage(finalResponse, event.threadID, event.messageID);
        } catch (error) {
            api.sendMessage('An error occurred while processing your request, please try sending your question again', event.threadID, event.messageID);
            console.error(error);
        }
    },
};
