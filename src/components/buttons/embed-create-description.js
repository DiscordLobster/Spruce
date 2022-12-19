const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-create-description',
  },
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-create-description')
      .setTitle('Embed Title');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Description')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('Input embed description');

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};