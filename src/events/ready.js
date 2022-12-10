module.exports = {
  name: "ready",
  once: true,
  async execute(client) {
    await console.log(`Connected! ☔`);

    await client.mongo.connect();
    await client.mongo.database("client").collection("conn").updateOne({ _id: client.user.id }, { $set: { timestamp: client.readyTimestamp } }, { upsert: true });
  }
};
