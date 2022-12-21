const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
  PermissionFlagsBits,
} = require('discord.js');

module.exports = {
  category: 'General',
  args: '(command)',
  example: '/help help',
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('View a list of commands or information about a single command')
    .addStringOption(o => o.setName('command').setDescription('Input a valid command name')),
  async execute(interaction, client) {
    const input = interaction.options.getString('command', false);

    const clientMember = await interaction.guild.members.fetch(client.user.id);

    const { commands } = client;

    if (input) {
      const command = commands.get(input);
      if (!command) return interaction.reply({ embeds: [client.embeds.errEmbed('Invalid command name provided!')], ephemeral: true });

      const embed = new EmbedBuilder()
        .setTitle(`/${command.data.name} ${command.args ?? ''}`)
        .setDescription(`${command.data.description}\n\nExample: \`${command.example ?? ''}\``)
        .setFooter({ text: `${command.category}` });

      return await interaction.reply({ embeds: [embed], ephemeral: true });
    }
    else {
      const b1 = new ButtonBuilder()
        .setCustomId('help-admin')
        .setLabel('Administration')
        .setStyle(ButtonStyle.Primary);

      const b2 = new ButtonBuilder()
        .setCustomId('help-general')
        .setLabel('General')
        .setStyle(ButtonStyle.Primary);

      const b3 = new ButtonBuilder()
        .setCustomId('help-mod')
        .setLabel('Moderation')
        .setStyle(ButtonStyle.Primary);

      const b4 = new ButtonBuilder()
        .setCustomId('help-tools')
        .setLabel('Tools')
        .setStyle(ButtonStyle.Primary);

      const b5 = new ButtonBuilder()
        .setCustomId('help-utils')
        .setLabel('Utilities')
        .setStyle(ButtonStyle.Primary);

      if (!interaction.member.permissions.has([PermissionFlagsBits.ModerateMembers])) {
        b3.setDisabled(true);
      }

      if (!interaction.member.permissions.has([PermissionFlagsBits.Administrator])) {
        b1.setDisabled(true);
      }

      const row = new ActionRowBuilder().setComponents(b1, b2, b3, b4, b5);

      const embed = new EmbedBuilder()
        .setDescription('Please use the buttons below to navigate through the commands available for you to use through the bot. ' +
          'Please note that if you\'re a regular member then some categories might not be accessible to you. Namely the Administration ' +
          'and Moderation categories. If you need further help don\'t hesitate to reach out to one of the staff members for support!')
        .setColor(clientMember.displayColor);

      await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
    }
  },
};