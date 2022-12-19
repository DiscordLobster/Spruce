const {
  EmbedBuilder,
} = require('discord.js');

module.exports = {
  data: {
    name: 'embed-create-title',
  },
  async execute(interaction, client) {
    const { embedCache } = client;

    let cachedEmbed = embedCache.get(interaction.member.id);
    if (!cachedEmbed) cachedEmbed = new EmbedBuilder().setDescription('Test Description');
    
    const data = interaction.fields.getTextInputValue('ti1');

    cachedEmbed.setTitle(`${data}`);

    await interaction.update({ embeds: [cachedEmbed] });
  },
};