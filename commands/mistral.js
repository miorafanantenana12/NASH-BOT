const axios = require('axios');

module.exports = {
    name: 'mistral',
    description: 'An AI command powered by Neuronspike, modified by joshua apostol',
    aliases: ['Mistral'],
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const input = args.join(' ');

        if (!input) {
            api.sendMessage(
                `Hello there!\n\nI am an AI developed by Bruno Rakotomalala. I am here to assist you with any questions or tasks you may have.\n\nUsage: mistral [your question]`,
                event.threadID,
                event.messageID
            );
            return;
        }

        api.sendMessage(`Processing your request...`, event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://hashier-api-groq.vercel.app/api/groq/mistral?ask=${encodeURIComponent(input)}`);
            const response = data.content;

            const finalResponse = `✩𝐉𝐎𝐒𝐇𝐁𝐎𝐓✩\n\n${response}\n\nMAKE YOUR OWN BOT HERE\n`;
            api.sendMessage(finalResponse, event.threadID, event.messageID);
        } catch (error) {
            api.sendMessage('An error occurred while processing your request, please try sending your question again', event.threadID, event.messageID);
            console.error(error);
        }
    },
};

