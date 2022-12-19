const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'test-warning',
  },
  async execute(interaction, client) {
    const clientMember = await interaction.guild.members.fetch(client.user.id);
    const b1 = new ButtonBuilder()
      .setCustomId('test-warning-create')
      .setLabel('Create Test Warning')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('test-warning-edit')
      .setLabel('Edit Test Warning')
      .setStyle(ButtonStyle.Primary);

    const b3 = new ButtonBuilder()
      .setCustomId('test-warning-delete')
      .setLabel('Delete Test Warning')
      .setStyle(ButtonStyle.Danger);

    const row = new ActionRowBuilder().setComponents(b1, b2, b3);

    const embed = new EmbedBuilder()
      .setAuthor({ name: 'Test Interface | Menu' })
      .setDescription(`*Use the buttons below to interact with the menu!*\n\n${b1.data.label} - Create a new test warning entry in the local cache on the bot using yourself as the tester\n${b2.data.label} - Edit an existing test warning entry if it exists\n${b3.data.label} - Delete an already existing test warning entry from the local cache`)
      .setColor(clientMember.displayColor);

    await interaction.update({ embeds: [embed], components: [row] });
  },
};