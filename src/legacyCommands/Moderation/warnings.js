const { PermissionFlagsBits } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;

module.exports = {
  name: 'warnings',
  description: 'View various warnings issued to users in the server',
  category: 'Moderation',
  args: true,
  usage: '[(v)iew/(e)dit/(d)elete] [all/user/warning] <id> (reason)',
  async execute(message, args, client) {
    if (!message.member.permissions.has([PermissionFlagsBits.ModerateMembers])) {
      return await message.reply({ content: 'You don\'t have permission to use this command!' })
        .then(async msg => {
          await wait(5000);
          await msg.delete();
          await message.delete();
        });
    }

    const args1 = ['view', 'v', 'edit', 'e', 'delete', 'd'];
    if (!args1.includes(args[0])) return message.reply({ embeds: [client.embeds.errEmbed(`Invalid first argument!\n\n\`${args1.join(', ')}\``)] })
      .then(async msg => {
        await wait(10000);
        await msg.delete();
        await message.delete();
      });

    if (args[0] === 'view' || args[0], 'v') {
      const args2 = ['all', 'user', 'warning'];
      if (!args2.includes(args[1])) return message.reply({ embeds: [client.embeds.errEmbed(`Invalid second argument with first argument: ${args[0]}\n\n\`${args2.join(', ')}\``)] })
        .then(async msg => {
          await wait(10000);
          await msg.delete();
          await message.delete();
        });

      if (args[1] === 'all') {
        //
      }
      else if (args[1] === 'user') {
        //
      }
      else if (args[1] === 'warning') {
        //
      }
    }
    else if (args[0] === 'edit' || args[0] === 'e') {
      //
    }
    else if (args[0] === 'delete' || args[0] === 'd') {
      //
    }
  },
};