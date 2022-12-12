const { readdirSync } = require("fs");
const { MongoClient } = require("mongodb");
const { Client, Collection, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.commands = new Collection();
client.mongo = new MongoClient(process.env["MONGO_URI"]);

const events = readdirSync("./src/events").filter(f => f.endsWith(".js"));
const commands = readdirSync("./src/commands").filter(f => f.endsWith(".js"));

for (const file of events) {
  const event = require(`./events/${file}`);
  if (event.once) {
    client.once(event.name, (...args) => event.execute(...args));
  } else {
    client.on(event.name, (...args) => event.execute(...args));
  }
};

for (const file of commands) {
  const command = require(`./commands/${file}`);
  client.commands.set(file.split(".js")[0], command);
};

client.login(process.env["DISCORD_TOKEN"]);
