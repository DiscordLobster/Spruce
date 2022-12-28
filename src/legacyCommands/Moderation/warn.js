const { PermissionFlagsBits, cleanContent } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: 'warn',
  description: 'Warn a user',
  category: 'Moderation',
  aliases: ['w'],
  args: true,
  usage: '<userID> <reason>',
  async execute(message, args, client) {
    const { botSettings, modWarnings } =  client;

    if (!message.member.permissions.has([PermissionFlagsBits.ModerateMembers])) {
      return message.reply({ embeds: [client.embeds.errEmbed("You don't have permission to use this command!")] })
        .then(async msg => {
          await wait(5000);
          await msg.delete();
          await message.delete();
        });
    }

    if (args.length < 2) return message.reply({ embeds: [client.embeds.errEmbed("Missing arguments!")] })
      .then(async msg => {
        await wait(5000);
        await msg.delete();
        await message.delete();
      });

    let target = args[0];
    const reason = args.slice(1).join(" ");

    try {
      target = await message.guild.members.fetch(target);
    }
    catch (err) {
      return await message.reply({ embeds: [client.embeds.errEmbed("User can't be resolved!")] })
        .then(async msg => {
          await wait(5000);
          await msg.delete();
          await message.delete();
        });
    }

    if (target.permissions.has([PermissionFlagsBits.ModerateMembers])) {
      return message.reply({ embeds: [client.embeds.errEmbed("You can't warn other staff members!")] })
      .then(async msg => {
        await wait(5000);
        await msg.delete();
        await message.delete();
      });
    }

    let settings = await botSettings.fetch(message.guildId);
    if (!settings) settings = await botSettings.add(message.guildId);

    const warning = await modWarnings.add(target, message.member, reason);

    var dmSent;

    try {
      await target.send({ embeds: [client.embeds.warnDmEmbed(warning.id, target, message.member, reason)] });
      dmSent = true;
    }
    catch {
      dmSent = false;
    }

    const channel = await message.guild.channels.fetch(settings.mod_logs);
    if (channel) {
      try {
        await channel.send({ embeds: [client.embeds.warnLogEmbed(warning.id, target, message.member, reason, dmSent)] });
      }
      catch {
        //
      }
    }

    await message.reply({ content: `${target}`, embeds: [client.embeds.warnEmbed(target, message.member, reason)], allowedMentions: { repliedUser: false } });
  },
};