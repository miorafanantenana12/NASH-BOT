const axios = require('axios');

const Prefixes = [
    'Ia',
    'chi ',
    'capucine',
    'ask',
    'edge',
    'miror',
];

module.exports = {
    name: 'ask',
    description: 'AI command',
    author: 'Bruno',
    aliases: ['capucine'],
    category: 'ai',
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const prefix = Prefixes.find((p) => event.body && event.body.toLowerCase().startsWith(p));
        if (!prefix) {
            return; // Invalid prefix, ignore the command
        }
        const prompt = event.body.substring(prefix.length).trim();

        if (!prompt) {
            api.sendMessage("🎯 Hey mes amours, je suis à votre disposition. Quelle est votre question❓", event.threadID, event.messageID);
            return;
        }

        api.sendMessage("Processing your request...", event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://liaspark.chatbotcommunity.ltd/@LianeAPI_Reworks/api/claire/?ask=${encodeURIComponent(prompt)}`);
            const answer = data.answer;

            api.sendMessage(`💖 CAPUCINE \n______________________\n${answer}\n_______________________ \n🎯 MIROR EDGE 🎯`, event.threadID, event.messageID);
        } catch (error) {
            console.error("Error:", error.message);
            api.sendMessage("An error occurred while processing your request.", event.threadID, event.messageID);
        }
    },
};
