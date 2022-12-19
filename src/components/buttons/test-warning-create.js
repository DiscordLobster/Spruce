const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'test-warning-create',
  },
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('warning-tester')
      .setTitle('Warning Form');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('reason')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('Input a reason for the warning');

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};