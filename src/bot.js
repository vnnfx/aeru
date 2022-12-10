const { Client } = require("discord.js");
const client = new Client({ intents: [] });

client.login(process.env["DISCORD_TOKEN"]);
setTimeout(() => process.exit(0), 30 * 1000)
