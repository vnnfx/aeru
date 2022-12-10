module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await console.log(`Connected! ☔`);

    await client.mongo.connect();
    await client.mongo.db("client").collection("conn").updateOne({ _id: client.user.id }, { $set: { timestamp: client.readyTimestamp } }, { upsert: true });

    setInterval(async () => {
      const { timestamp } = await client.mongo.db("client").collection("conn").findOne({ _id: client.user.id });
      if (timestamp !== client.readyTimestamp) return await process.exit(0);
    }, 1000)
  }
};
