const { PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: 'warnings',
  description: 'View various warnings issued to users in the server',
  category: 'Moderation',
  args: true,
  usage: '[(v)iew/(e)dit/(d)elete] [all/user/warning] <id> (reason)',
  async execute(message, args, client) {
    const { modWarnings, botSettings } = client;

    if (!message.member.permissions.has([PermissionFlagsBits.ModerateMembers])) {
      return await message.reply({ content: 'You don\'t have permission to use this command!' })
        .then(async msg => {
          await wait(5000);
          await msg.delete();
          await message.delete();
        });
    }

    const args1 = ['view', 'v', 'edit', 'e', 'delete', 'd'];
    if (!args1.includes(args[0])) return await message.reply({ embeds: [client.embeds.errEmbed(`Invalid first argument!\n\n\`${args1.join(', ')}\``)] })
      .then(async msg => {
        await wait(10000);
        await msg.delete();
        await message.delete();
      });

    if (args[0] === 'view' || args[0], 'v') {
      const args2 = ['all', 'user', 'warning'];
      if (!args2.includes(args[1])) return await message.reply({ embeds: [client.embeds.errEmbed(`Invalid second argument with first argument: ${args[0]}\n\n\`${args2.join(', ')}\``)] })
        .then(async msg => {
          await wait(10000);
          await msg.delete();
          await message.delete();
        });

      if (args[1] === 'all') {
        const warnings = await modWarnings.fetchAll();
        
        if (!warnings || warnings.length < 1) return await message.reply({ embeds: [client.embeds.errEmbed('No warnings were found!')] })
          .then(async msg => {
            await wait(10000);
            await msg.delete();
            await message.delete();
          });

        const newArray = warnings.map(key => `Case ${key.id}\nOffender: ${key.offender}\nModerator: ${key.moderator}`);

        const embed = new EmbedBuilder()
          .setTitle(`All Warnings | ${warnings.length} Total`)
          .setAuthor({ name: message.author.tag, iconURL: message.member.displayAvatarURL(true) })
          .setColor(message.member.displayColor)
          .setDescription(`${newArray.join('\n\n')}`)
          .setFooter({ text: 'Use s!warnings view warning (id) to view more information about a warning' });

        return await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      }
      else if (args[1] === 'user') {
        const userId = args[2];
        if (!args[2]) return await message.reply({ embeds: [client.embeds.errEmbed('No user ID was provided!')] })
          .then(async msg => {
            await wait(10000);
            await msg.delete();
            await message.delete();
          });
        
        const warnings = await modWarnings.fetchAllByUser(userId);

        if (!warnings || warnings.length < 1) return await message.reply({ embeds: [client.embeds.errEmbed(`No warnings were found for: ${args[2]}`)] })
          .then(async msg => {
            await wait(10000);
            await msg.delete();
            await message.delete();
          });

        const newArray = warnings.map(key => `Case ${key.id}\nModerator: <@${key.moderator}> | \`${key.moderator}\`\nReason: ${key.reason}`);

        const embed = new EmbedBuilder()
          .setTitle(`User Warnings | ${warnings.length} Total`)
          .setAuthor({ name: message.author.tag, iconURL: message.member.displayAvatarURL(true) })
          .setColor(message.member.displayColor)
          .setDescription(`${newArray.join('\n\n')}`)
          .setFooter({ text: 'Use s!warnings view warning (id) to view more information about a warning' });

        return await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      }
      else if (args[1] === 'warning') {
        const warnId = args[2];
        if (!args[2]) return await message.reply({ embeds: [client.embeds.errEmbed('No warning case ID was provided!')] })
          .then(async msg => {
            await wait(10000);
            await msg.delete();
            await message.delete();
          });

          const warning = await modWarnings.fetch(warnId);
          if (!warning) return await message.reply({ embeds: [client.embeds.errEmbed(`No warning was found under case number: \`${args[2]}\``)] })
            .then(async msg => {
              await wait(10000);
              await msg.delete();
              await message.delete();
            });

          const embed = new EmbedBuilder()
            .setTitle(`Case ${warning.id}`)
            .setAuthor({ name: message.author.tag, iconURL: message.member.displayAvatarURL(true) })
            .setColor(message.member.displayColor)
            .setDescription(`Offender: <@${warning.offender}> | \`${warning.offender}\`\n\nReason: *"${warning.reason}"*\n\nModerator: <@${warning.moderator}> | \`${warning.moderator}\``)
            .setFooter({ text: `Created` })
            .setTimestamp(warning.createdAt);

          return await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      }
    }
    else if (args[0] === 'edit' || args[0] === 'e') {
      const args2 = ['warning'];
      if (!args2.includes(args[1])) return await message.reply({ embeds: [client.embeds.errEmbed(`Invalid second argument with first argument: ${args[0]}\n\n\`${args2.join(', ')}\``)] })
        .then(async msg => {
          await wait(10000);
          await msg.delete();
          await message.delete();
        });

      if (args[1] === 'warning') {
        const warnId = args[2];
        const reason = args.slice(3).join(' ');

        if (!warnId) return await message.reply({ embeds: [client.embeds.errEmbed(`No warning ID was provided for your third argument!`)] })
          .then(async msg => {
            await wait(10000);
            await msg.delete();
            await message.delete();
          });

        const warning = await modWarnings.fetch(warnId);
        if (!warning) return await message.reply({ embeds: [client.embeds.errEmbed(`No warning was found attached to ID: \`${warnId}\``)] })
          .then(async msg => {
            await wait(10000);
            await msg.delete();
            await message.delete();
          });

        if (reason.length < 1) return await message.reply({ embeds: [client.embeds.errEmbed(`No reason was provided for your fourth argument!`)] })
          .then(async msg => {
            await wait(10000);
            await msg.delete();
            await message.delete();
          });

        await modWarnings.edit(warnId, reason);

        let settings = await botSettings.fetch(message.guildId);
        if (!settings) settings = await botSettings.add(message.guildId);

        const channel = botSettings.mod_logs;

        const warnLogEmbed = new EmbedBuilder()
          .setColor([254, 223, 5])
          .setTitle(`Warning | Case ${warning.id}`)
          .setDescription(`A warning belonging to <@${warning.offender}> | \`${warning.offender}\` has been edited by ${message.author}\n\nOld Reason: ${warning.reason}\nNew Reason: ${reason}`)
          .setTimestamp(Date.now());

        try {
          await channel.send({ embeds: [warnLogEmbed] });
        }
        catch {
          //
        }

        return await message.reply({ content: `Successfully updated reason to: ${reason}`, allowedMentions: { repliedUser: false } });
      }
    }
    else if (args[0] === 'delete' || args[0] === 'd') {
      const args2 = ['all', 'user', 'warning'];
      if (!args2.includes(args[1])) return await message.reply({ embeds: [client.embeds.errEmbed(`Invalid second argument with first argument: ${args[0]}\n\n\`${args2.join(', ')}\``)] })
        .then(async msg => {
          await wait(10000);
          await msg.delete();
          await message.delete();
        });

      //
    }
  },
};