const { ChannelType } = require('discord.js');

module.exports = {
  name: 'channelCreate',
  async execute(channel, client) {
    const textChannel = channel.type === ChannelType.GuildText;
    const voiceChanenl = channel.type === ChannelType.GuildVoice;
    const categoryChannel = channel.type === ChannelType.GuildCategory;
    const announcementChannel = channel.type === ChannelType.GuildAnnouncement;
    const directoryChannel = channel.type === ChannelType.GuildDirectory;
    const forumChannel = channel.tyoe === ChannelType.GuildForum;
    const stageChannel = channel.type === ChannelType.GuildStageVoice;
    // Add more channels later

    const { botSettings } = client;
  },
};