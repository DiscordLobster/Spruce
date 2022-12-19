const {
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-create-description',
  },
  async execute(interaction, client) {
    const { embedCache } = client;

    let cachedEmbed = embedCache.get(interaction.member.id);
    if (!cachedEmbed) cachedEmbed = new EmbedBuilder();
    
    const data = interaction.fields.getTextInputValue('ti1');

    cachedEmbed.setDescription(`${data}`);

    await interaction.update({ embeds: [cachedEmbed] });
  },
};