const axios = require('axios');

async function getUserNames(api, uid) {
    try {
        const userInfo = await api.getUserInfo([uid]);
        return Object.values(userInfo).map(user => user.name || `User${uid}`);
    } catch (error) {
        console.error('Erreur lors de la récupération des noms d\'utilisateur :', error);
        return [];
    }
}

function formatFont(text) {
    const fontMapping = {
        a: "𝚊", b: "𝚋", c: "𝚌", d: "𝚍", e: "𝚎", f: "𝚏", g: "𝚐", h: "𝚑", i: "𝚒", j: "𝚓", k: "𝚔", l: "𝚕", m: "𝚖",
        n: "𝚗", o: "𝚘", p: "𝚙", q: "𝚚", r: "𝚛", s: "𝚜", t: "𝚝", u: "𝚞", v: "𝚟", w: "𝚠", x: "𝚡", y: "𝚢", z: "𝚣",
        A: "𝙰", B: "𝙱", C: "𝙲", D: "𝙳", E: "𝙴", F: "𝙵", G: "𝙶", H: "𝙷", I: "𝙸", J: "𝙹", K: "𝙺", L: "𝙻", M: "𝙼",
        N: "𝙽", O: "𝙾", P: "𝙿", Q: "𝚀", R: "𝚁", S: "𝚂", T: "𝚃", U: "𝚄", V: "𝚅", W: "𝚆", X: "𝚇", Y: "𝚈", Z: "𝚉"
    };

    return text.split('').map(char => fontMapping[char] || char).join('');
}

module.exports = {
    name: 'snowflakes',
    description: 'An AI command powered by Neuronspike, modified by joshua apostol',
    aliases: ['Bruno'],
    cooldown: 3,
    nashPrefix: false,
    execute: async (api, event, args) => {
        const uid = event.senderID;
        const userNames = await getUserNames(api, uid);
        const user = args.join(' ');

        if (!user) {
            api.sendMessage("Veuillez d'abord fournir une question !", event.threadID, event.messageID);
            return;
        }

        api.sendMessage(`🔍⚡B⚡r⚡u⚡n⚡o⚡ répondra à votre question, mais veuillez patienter....`, event.threadID, event.messageID);

        try {
            const { data } = await axios.get(`https://hashier-api-snowflake.vercel.app/api/snowflake?ask=${encodeURIComponent(user)}`);
            const content = formatFont(data.response);

            api.sendMessage(`❤️🇧 🇷 🇺 🇳 🇴 ❤️\n\n🖋️ Réponse : '${content}'\n\n👤 Question posée par : ${userNames.join(', ')}`, event.threadID, event.messageID);
        } catch (err) {
            console.error('Error making Snowflake API request:', err);
            api.sendMessage("Une erreur est survenue lors du traitement de votre demande.", event.threadID, event.messageID);
        }
    },
};
