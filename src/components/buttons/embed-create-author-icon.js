const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-create-author-icon',
  },
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-create-author-icon')
      .setTitle('Embed Author Icon');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Icon URL')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Input valid image URL');

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};