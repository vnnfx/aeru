const { MongoClient } = require("mongodb");
const { Client, Collection } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
});

client.commands = new Collection();
client.mongo = new MongoClient({ url: process.env["MONGO_URI"] });

client.login(process.env["DISCORD_TOKEN"]);
setTimeout(() => process.exit(0), 5 * 60 * 60 * 1000)
