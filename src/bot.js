const { readdirSync } = require("fs");
const { MongoClient } = require("mongodb");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ]
});

client.commands = new Collection();
client.mongo = new MongoClient(process.env["MONGO_URI"]);

const events = readdirSync("./src/events").filter(f => f.endsWith(".js"));
for (const file of events) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
};

client.login(process.env["DISCORD_TOKEN"]);
setTimeout(() => process.exit(0), 5 * 60 * 60 * 1000)
