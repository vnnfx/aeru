const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("ping")
    .setDescription("🌂 - Tes sinyal")
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.reply({
      content: `Ehe! ${Date.now() - interaction.createdTimestamp}ms ((≧▽≦))`
    })
  }
};
