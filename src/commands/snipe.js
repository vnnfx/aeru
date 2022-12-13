const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("🌂 - Lihat pesan yang dihapus")
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply();

    const cache = await interaction.client.mongo.db("snipe").collection(interaction.guildId).findOne({ _id: interaction.channelId });
    if (!cache) return await interaction.editReply({ content: "Ga ada pesan yang dihapus" });

    await interaction.editReply({ content: "Available soon.." });
  }
};
