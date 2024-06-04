const { findUid } = global.utils;
const regExCheckURL = /^(http|https):\/\/[^ "]+$/;

module.exports = {
    name: 'uid',
    description: 'An uid command powered by Neuronspike, modified by Joshua Apostol',
    aliases: ['uid'],
    cooldown: 3,
    nashPrefix: false,
    execute: async function ({ message, event, args, getLang }) {
        if (event.messageReply) {
            return message.reply(event.messageReply.senderID);
        }

        if (!args[0]) {
            return message.reply(event.senderID);
        }

        if (args[0].match(regExCheckURL)) {
            let msg = '';
            for (const link of args) {
                try {
                    const uid = await findUid(link);
                    msg += `${link} => ${uid}\n`;
                } catch (e) {
                    msg += `${link} (ERROR) => ${e.message}\n`;
                }
            }
            return message.reply(msg);
        }

        const { mentions } = event;
        let msg = '';
        for (const id in mentions) {
            msg += `${mentions[id].replace("@", "")}: ${id}\n`;
        }
        message.reply(msg || getLang("syntaxError"));
    }
};
