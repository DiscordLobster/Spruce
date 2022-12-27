const {
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'warnings-view-by-id',
  },
  async execute(interaction, client) {
    const { modWarnings, botSettings } = client;
    const data = interaction.fields.getTextInputValue('ti1');

    const settings = await botSettings.fetch(interaction.guild.id);

    if (isNaN(data) || data < 1) return interaction.reply({ embeds: [client.embeds.errEmbed('Invalid number provided!')], ephemeral: true });

    const warning = await modWarnings.fetch(parseInt(data));

    if (!warning) return interaction.reply({ embeds: [client.embeds.errEmbed('No warning was found with this ID!')], ephemeral: true });

    const b1 = new ButtonBuilder()
      .setCustomId('warning-edit-reason')
      .setLabel('Edit Reason')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('warning-attach-proof')
      .setLabel('Attach Proof')
      .setStyle(ButtonStyle.Primary)
      .setDisabled(true);

    const row = new ActionRowBuilder().setComponents(b1, b2);

    const embed = new EmbedBuilder()
      .setTitle(`Case ${warning.id}`)
      .setColor(interaction.member.displayColor)
      .setDescription(`Offender: <@${warning.offender}> | ${warning.offender}\n\nReason: ${warning.reason}\n\nModerator: <@${warning.moderator}> | ${warning.moderator}`)
      .setFooter({ text: `Warn Created At` })
      .setTimestamp(warning.createdAt);

    await interaction.update({ embeds: [embed], components: [row] });
  },
};