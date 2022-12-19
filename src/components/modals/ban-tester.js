const {
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'ban-tester',
  },
  async execute(interaction, client) {
    const reason = interaction.fields.getTextInputValue('ti1');
    const { embeds } = client;

    const offender = interaction.member;

    const channel = await interaction.guild.channels.fetch('1034234634998923344');

    await interaction.channel.send({ embeds: [embeds.banEmbed(offender, interaction.member, reason)], content: `${offender}` });

    var dmSent;

    try {
      await offender.send({ embeds: [embeds.banDmEmbed(1, offender, interaction.member, reason)] });
      dmSent = true;
    } catch {
      dmSent = false;
    }

    await channel.send({ embeds: [embeds.banLogEmbed(1, offender, interaction.member, reason, dmSent)] });

    await interaction.update({ embeds: [], content: 'Successfully tested warning embeds', components: [] });
  },
};