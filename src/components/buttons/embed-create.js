const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-create',
  },
  async execute(interaction, client) {
    const clientMember = await interaction.guild.members.fetch(client.user.id);
    const { embedCache } = client;

    const freshEmbed = new EmbedBuilder()
      .setColor(clientMember.displayColor)
      .setDescription('Test Description');

    embedCache.set(interaction.member.id, freshEmbed);

    const b1 = new ButtonBuilder()
      .setCustomId('embed-create-description')
      .setLabel('Set Description')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('embed-create-title')
      .setLabel('Set Title')
      .setStyle(ButtonStyle.Secondary);

    const b3 = new ButtonBuilder()
      .setCustomId('embed-create-author')
      .setLabel('Edit Author')
      .setStyle(ButtonStyle.Secondary);

    const b4 = new ButtonBuilder()
      .setCustomId('embed-create-color')
      .setLabel('Set Color')
      .setStyle(ButtonStyle.Secondary);

    const b5 = new ButtonBuilder()
      .setCustomId('embed-create-fields')
      .setLabel('Edit Fields')
      .setStyle(ButtonStyle.Secondary);

    const b6 = new ButtonBuilder()
      .setCustomId('embed-create-footer')
      .setLabel('Edit Footer')
      .setStyle(ButtonStyle.Secondary);

    const b7 = new ButtonBuilder()
      .setCustomId('embed-create-thumbnail')
      .setLabel('Set Thumbnail')
      .setStyle(ButtonStyle.Secondary);

    const b8 = new ButtonBuilder()
      .setCustomId('embed-create-image')
      .setLabel('Set Image')
      .setStyle(ButtonStyle.Secondary);

    const b9 = new ButtonBuilder()
      .setCustomId('embed-create-timestamp')
      .setLabel('Set Timestamp')
      .setStyle(ButtonStyle.Secondary);

    const b10 = new ButtonBuilder()
      .setCustomId('embed-send-current-channel')
      .setLabel('Send In Current Channel')
      .setStyle(ButtonStyle.Success);

    const b11 = new ButtonBuilder()
      .setCustomId('embed-send-in-other-channel')
      .setLabel('Send In Other Channel By ID')
      .setStyle(ButtonStyle.Success);

    const row1 = new ActionRowBuilder().setComponents(b1, b2, b3, b4, b5);
    const row2 = new ActionRowBuilder().setComponents(b6, b7, b8, b9);
    const row3 = new ActionRowBuilder().setComponents(b10, b11);

    await interaction.update({ embeds: [freshEmbed], components: [row1, row2, row3] });
  },
};