const { EmbedBuilder, userMention } = require('discord.js');

module.exports = {
  data: {
    name: 'embed-create-author-name',
  },
  async execute(interaction, client) {
    const { embedCache } = client;
    let cachedEmbed = embedCache.get(interaction.member.id);
    if (!cachedEmbed) cachedEmbed = new EmbedBuilder().setDescription('Test Description');

    const components = await interaction.message.components;
    const row1 = components[0];
    const row2 = components[2];
    const row3 = components[3];

    const data = interaction.fields.getTextInputValue('ti1');

    if (data === 'me') {
      cachedEmbed.setAuthor({ name: interaction.user.tag });
    }
    else if (data === 'you') {
      cachedEmbed.setAuthor({ name: client.user.tag });
    }
    else if (userMention(data)) {
      cachedEmbed.setAuthor({ name: `${userMention(data).tag}` });
    }
    else {
      cachedEmbed.setAuthor({ name: `${data}` });
    }

    await interaction.update({ embeds: [cachedEmbed], components: [row1, row2, row3] });
  },
};