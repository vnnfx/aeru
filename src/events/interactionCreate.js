const { ApplicationCommandTypes } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    const { timestamp } = await interaction.client.mongo.db("client").collection("conn").findOne({ _id: interaction.client.user.id });
    if (timestamp !== interaction.client.readyTimestamp) return await process.exit(0);

    if (!interaction.isCommand()) {
      const command = await interaction.client.commands.find(command => command.data.name === interaction.commandName && command.data.type === [undefined, ApplicationCommandTypes.User, ApplicationCommandTypes.Message][interaction.commandType - 1]);
      if (command) return await command.execute(interaction);
    }
  }
};
