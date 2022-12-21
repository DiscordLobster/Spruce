const {
  SlashCommandBuilder,
  EmbedBuilder,
  PermissionFlagsBits,
} = require('discord.js');

module.exports = {
  category: 'Moderation',
  args: '(@user) (reason)',
  data: new SlashCommandBuilder()
    .setName('warn')
    .setDescription('Initiate a new warning for a user in the server')
    .setDefaultMemberPermissions(PermissionFlagsBits.ModerateMembers)
    .addUserOption(o => o.setName('user').setDescription('Select a user').setRequired(true))
    .addStringOption(o => o.setName('reason').setDescription('Input a reason').setRequired(true)),
  async execute(interaction, client) {
    const { modWarnings, botSettings } = client;

    let settings = await botSettings.fetch(interaction.guild.id);
    if (!settings) settings = await botSettings.add(interaction.guild.id);

    const user = interaction.options.getMember('user');
    const reason = interaction.options.getString('reason');

    if (user.user.bot) return interaction.reply({ embeds: [client.embeds.errEmbed('You can\'t use commands on bots!')], ephemeral: true });
    if (user.permissions.has([PermissionFlagsBits.ModerateMembers])) {
      return interaction.reply({ embeds: [client.embeds.errEmbed('You can\'t use moderation commands on other staff!')], ephemeral: true });
    }

    const warning = await modWarnings.add(user, interaction.member, reason);

    var dmSent;

    try {
      await user.send({ embeds: [client.embeds.warnDmEmbed(warning.id, user, interaction.member, reason)] });
      dmSent = true;
    }
    catch {
      dmSent = false;
    }

    const channel = await interaction.guild.channels.fetch(settings.mod_logs);
    if (channel) {
      try {
        await channel.send({ embeds: [client.embeds.warnLogEmbed(warning.id, user, interaction.member, reason, dmSent)] });
      }
      catch {
        //
      }
    }

    await interaction.reply({ content: `${user}`, embeds: [client.embeds.warnEmbed(user, interaction.member, reason)] });
  },
};