const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  category: 'Moderation',
  data: new SlashCommandBuilder()
    .setName('warnings')
    .setDescription('View various warnings in the server using different filters'),
  async execute(interaction, client) {
    const clientMember = await interaction.guild.members.fetch(client.user.id);

    const b1 = new ButtonBuilder()
      .setCustomId('warnings-view-by-id')
      .setLabel('View By ID')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('warnings-view-all-user')
      .setLabel('View All User Warnings')
      .setStyle(ButtonStyle.Primary);

    const b3 = new ButtonBuilder()
      .setCustomId('warnings-view-all')
      .setLabel('View All Warnings')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().setComponents(b1, b2, b3);

    const embed = new EmbedBuilder()
      .setAuthor({ name: interaction.user.tag, iconURL: interaction.member.displayAvatarURL(true) })
      .setColor(clientMember.displayColor)
      .setTitle('Warning System')
      .setDescription('Use the buttons below to navigate through the warnings the bot currently has in it\'s database. Please note that everything used within the bot requires IDs so make sure you have them copied somewhere before continuing!');

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};