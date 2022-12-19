const {
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'warning-tester',
  },
  async execute(interaction, client) {
    const reason = interaction.fields.getTextInputValue('ti1');
    const { embeds, testWarnings } = client;

    const offender = interaction.member;

    const channel = await interaction.guild.channels.fetch('1034234634998923344');

    await interaction.channel.send({ embeds: [embeds.warnEmbed(offender, interaction.member, reason)], content: `${offender}` });

    var dmSent;

    try {
      await offender.send({ embeds: [embeds.warnDmEmbed(1, offender, interaction.member, reason)] });
      dmSent = true;
    } catch {
      dmSent = false;
    }

    await channel.send({ embeds: [embeds.warnLogEmbed(1, offender, interaction.member, reason, dmSent)] });

    await interaction.update({ embeds: [], content: 'Successfully tested warning embeds', components: [] });
  },
};