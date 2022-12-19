const {
  SlashCommandBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  EmbedBuilder,
  PermissionFlagsBits
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('test')
    .setDescription('Test various embeds and messages')
    .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
  async execute(interaction, client) {
    const b1 = new ButtonBuilder()
      .setCustomId('test-warning')
      .setLabel('Test Warning')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('test-ban')
      .setLabel('Test Ban')
      .setStyle(ButtonStyle.Primary);

    const embed = new EmbedBuilder()
      .setAuthor({ name: 'Test Interface' })
      .setColor(interaction.member.displayColor)
      .setDescription('This command gives you the option to test various messages and commands on yourself without the adverse effects ' +
        'of the moderation system. This is a good way to test if the moderation system is working properly without applying moderations ' +
        'to other users or yourself. Use the buttons below and read the prompts that follow.');

    const row = new ActionRowBuilder().setComponents(b1, b2);

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};