const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-create-title',
  },
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-create-title')
      .setTitle('Embed Title');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Title')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('Input embed title');

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};