const { ApplicationCommandTypes } = require("discord.js");

module.exports = {
  name: "interactionCreate",
  async execute(interaction) {
    if (!interaction.isCommand()) {
      const command = await interaction.client.commands.find(command => command.data.name === interaction.commandName && command.data.type === [undefined, ApplicationCommandTypes.User, ApplicationCommandTypes.Message][interaction.commandType - 1]);
      if (command) return await command.execute(interaction);
    }
  }
};
