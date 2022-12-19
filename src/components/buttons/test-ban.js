const {
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'test-ban',
  },
  async execute(interaction, client) {
    const modal = new ModalBuilder()
      .setCustomId('ban-tester')
      .setTitle('Ban Form');

    const ti1 = new TextInputBuilder()
      .setCustomId('ti1')
      .setLabel('reason')
      .setStyle(TextInputStyle.Paragraph)
      .setPlaceholder('Input a reason for the ban');

    const row = new ActionRowBuilder().setComponents(ti1);

    modal.setComponents(row);

    await interaction.showModal(modal);
  },
};