const { TempMail } = require("1secmail-api");

function generateRandomId() {
    const length = 6;
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let randomId = '';

    for (let i = 0; i < length; i++) {
        randomId += characters.charAt(Math.floor(Math.random() * characters.length));
    }

    return randomId;
}

module.exports = {
    name: "tempmail",
    credits: "Deku", // converted to NashBot by joshua Apostol
    description: "Generate a temporary email (auto get inbox)",
    aliases: ["temp"],
    cooldown: 5,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const { threadID, messageID } = event;
        const reply = (msg) => api.sendMessage(msg, threadID, messageID);

        try {
            const mail = new TempMail(generateRandomId());
            mail.autoFetch();

            if (mail) {
                reply("Your temporary email: " + mail.address);
            }

            const fetch = async () => {
                const mails = await mail.getMail();
                if (!mails[0]) return;

                const { from, subject, textBody, date } = mails[0];
                const msg = `You have a message!\n\nFrom: ${from}\n\nSubject: ${subject}\n\nMessage: ${textBody}\nDate: ${date}`;
                reply(msg + `\n\nOnce the email and message are received, they will be automatically deleted.`);
                
                return mail.deleteMail();
            };
            
            fetch();
            setInterval(fetch, 3 * 1000);

        } catch (err) {
            console.error(err);
            return reply(err.message);
        }
    }
};
