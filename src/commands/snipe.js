const { SlashCommandBuilder } = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("snipe")
    .setDescription("🌂 - Lihat pesan yang dihapus")
    .setDMPermission(false),
  async execute(message) {
    await interaction.deferReply();

    const cache = await message.client.mongo.db("snipe").collection(interaction.guildId).findOne({ _id: interaction.channelId });
    if (!cache) return await interaction.editReply({ content: "Ga ada pesan yang dihapus" });

    await interaction.editReply({ content: "Available soon.." });
  }
};
