const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-create-author-name',
  },
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('embed-create-author-name')
      .setTitle('Embed Author Name');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Name')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Input author name');

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};