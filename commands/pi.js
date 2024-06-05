const axios = require("axios");

module.exports = {
    name: "pi",
    description: "chat with PI AI",
    aliases: ["pia"],
    cooldown: 5,
    execute: async (api, event, args) => {
        const prompt = args.join(" ");
        
        if (!prompt) {
            api.sendMessage("Please provide some text", event.threadID, event.messageID);
            return;
        }

        try {
            const uid = event.senderID;
            const { data } = await axios.get(`https://for-devs.onrender.com/api/pi?query=${encodeURIComponent(prompt)}&uid=${uid}&apikey=api1`);

            if (data && data.result) {
                api.sendMessage(data.result, event.threadID, event.messageID, (err, info) => {
                    if (err) {
                        console.error("Message sending error:", err);
                        return;
                    }
                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: "pi",
                        messageID: info.messageID,
                        author: event.senderID
                    });
                });
            } else {
                console.error("API Error:", data);
                sendErrorMessage(api, event.threadID, event.messageID, "Server not responding ❌");
            }
        } catch (error) {
            console.error("Request Error:", error.message);
            sendErrorMessage(api, event.threadID, event.messageID, "Server not responding ❌");
        }
    },
    onReply: async (api, event, reply, args) => {
        const { author, commandName } = reply;
        
        if (event.senderID !== author) return;

        const prompt = args.join(" ");

        if (!prompt) {
            api.sendMessage("Please provide some text", event.threadID, event.messageID);
            return;
        }

        try {
            const uid = event.senderID;
            const { data } = await axios.get(`https://for-devs.onrender.com/api/pi?query=${encodeURIComponent(prompt)}&uid=${uid}&apikey=api1`);

            if (data && data.result) {
                api.sendMessage(data.result, event.threadID, event.messageID, (err, info) => {
                    if (err) {
                        console.error("Message sending error:", err);
                        return;
                    }
                    global.GoatBot.onReply.set(info.messageID, {
                        commandName: commandName,
                        messageID: info.messageID,
                        author: event.senderID
                    });
                });
            } else {
                console.error("API Error:", data);
                sendErrorMessage(api, event.threadID, event.messageID, "Server not responding ❌");
            }
        } catch (error) {
            console.error("Request Error:", error.message);
            sendErrorMessage(api, event.threadID, event.messageID, "Server not responding ❌");
        }
    }
};

function sendErrorMessage(api, threadID, messageID, errorMessage) {
    api.sendMessage({ body: errorMessage }, threadID, messageID);
}
