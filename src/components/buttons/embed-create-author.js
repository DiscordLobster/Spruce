const {
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-create-author',
  },
  async execute(interaction, client) {
    const components = await interaction.message.components;

    const b1 = new ButtonBuilder()
      .setCustomId('embed-create-author-name')
      .setLabel('Set Author Name')
      .setStyle(ButtonStyle.Secondary);

    const b2 = new ButtonBuilder()
      .setCustomId('embed-create-author-icon')
      .setLabel('Set Author Icon URL')
      .setStyle(ButtonStyle.Secondary);

    const row1 = components[0];
    const row2 = new ActionRowBuilder().setComponents(b1, b2);
    const row3 = components[1];
    const row4 = components[2];

    await interaction.update({ components: [row1, row2, row3, row4] });
  },
};