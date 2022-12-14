module.exports = {
  name: "messageDelete",
  async execute(message) {
    const { timestamp } = await message.client.mongo.db("client").collction("conn").findOne({ _id: message.client.user.id });
    if (timestamp !== message.client.readyTimestamp) return await process.exit(0);

    if (message.inGuild() && !message.author.bot) {
      await message.client.mongo.db("snipes").collection(message.guildId).updateOne({ _id: message.channelId }, { $set: { message } }, { upsert: true });
    }
  }
};
