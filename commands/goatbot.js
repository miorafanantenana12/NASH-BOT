const axios = require('axios');

module.exports = {
    name: 'goatbot',
    description: 'A bot that generates Goatbot Command module. Note: Not supported all of goatbot features, can make mistakes.',
    aliases: ['goatbot'],
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args, usersData) => {
        try {
            // Joindre les arguments pour former la requête de l'utilisateur
            const query = args.join(" ") || "hello";
            const user = await usersData.get(event.senderID);
            const name = user ? user.name : "a user";

            // Réagir au message de l'utilisateur avec une icône de sablier
            api.setMessageReaction("⏳", event.messageID, (err) => console.log(err), true);

            // Envoyer un message de traitement
            const processingMessage = await api.sendMessage(
                `Asking Goatbot Generator. Please wait a moment...`,
                event.threadID
            );

            // URL de l'API pour obtenir la réponse de Goatbot
            const apiUrl = `https://liaspark.chatbotcommunity.ltd/@CodingAI_Liane/api/goatbot?key=j86bwkwo-8hako-12C&userName=${encodeURIComponent(name)}&query=${encodeURIComponent(query)}`;
            const response = await axios.get(apiUrl);

            if (response.data && response.data.message) {
                // Si la réponse de l'API est valide, envoyer la réponse à l'utilisateur
                const trimmedMessage = response.data.message.trim();
                api.setMessageReaction("✅", event.messageID, (err) => console.log(err), true);
                await api.sendMessage({ body: trimmedMessage }, event.threadID, event.messageID);
                console.log(`Sent Goatbot Generator's response to the user`);
            } else {
                throw new Error(`Invalid or missing response from Goatbot Generator API`);
            }

            // Supprimer le message de traitement
            await api.unsendMessage(processingMessage.messageID);
        } catch (error) {
            // En cas d'erreur, informer l'utilisateur et enregistrer l'erreur dans la console
            console.error(`❌ | Failed to get Goatbot Generator's response: ${error.message}`);
            const errorMessage = `❌ | An error occurred. You can try typing your query again or resending it. There might be an issue with the server that's causing the problem, and it might resolve on retrying.`;
            api.sendMessage(errorMessage, event.threadID);
        }
    },
};
