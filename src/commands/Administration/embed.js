const {
  SlashCommandBuilder,
  EmbedBuilder,
  ButtonBuilder,
  ButtonStyle,
  ActionRowBuilder
} = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setDefaultMemberPermissions(0)
    .setName('embed')
    .setDescription('Create or edit an existing embed with the bot'),
  async execute(interaction, client) {
    const clientMember = await interaction.guild.members.fetch(client.user.id);

    const b1 = new ButtonBuilder()
      .setCustomId('embed-create')
      .setLabel('Create New Embed')
      .setStyle(ButtonStyle.Primary);

    const b2 = new ButtonBuilder()
      .setCustomId('embed-edit')
      .setLabel('Edit Existing Embed')
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().setComponents(b1, b2);

    const embed = new EmbedBuilder()
      .setAuthor({ name: `Embed Interface` })
      .setColor(clientMember.displayColor)
      .setDescription('**Create New Embed** - You can create various embeds to send in many different channels. All parts of the embed are ' +
        'editable and fully configurable for complete user experience.\n\n**Edit Existing Embed** - This will only work on Embed messages the bot has sent. It *can\'t* be used on anyone else\'s messages. You can edit any part of the embed message.\n\n*Please note that not all parts of an embed may be loaded by the bot sometimes. That is not my fault.*')
      .setTimestamp(Date.now());

    await interaction.reply({ embeds: [embed], components: [row], ephemeral: true });
  },
};