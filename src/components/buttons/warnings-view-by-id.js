const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'warnings-view-by-id',
  },
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('warnings-view-by-id')
      .setTitle('View Warning By ID');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('Case ID')
      .setStyle(TextInputStyle.Short)
      .setPlaceholder('Input a valid warning case ID');

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};