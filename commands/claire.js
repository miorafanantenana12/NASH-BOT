const axios = require('axios');

module.exports = {
    name: 'claire',
    description: 'A command powered by the Claire API',
    aliases: ['chatbot'],
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const input = args.join(' ');

        if (!input) {
            api.sendMessage(
                `Hello there!\n\nI am a chatbot powered by the Claire API. I am here to assist you with any questions or tasks you may have.\n\nUsage: claire [your question]`,
                event.threadID,
                event.messageID
            );
            return;
        }

        api.sendMessage(`Processing your request...`, event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://liaspark.chatbotcommunity.ltd/@LianeAPI_Reworks/api/claire/?ask=${encodeURIComponent(input)}`);
            const response = data.response;

            const finalResponse = `🤖 Claire says: ${response}`;
            api.sendMessage(finalResponse, event.threadID, event.messageID);
        } catch (error) {
            api.sendMessage('An error occurred while processing your request, please try sending your question again', event.threadID, event.messageID);
            console.error(error);
        }
    },
};
