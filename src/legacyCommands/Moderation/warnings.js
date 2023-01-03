const { EmbedBuilder } = require('discord.js');
const { cleanReply } = require('../../utilities/Constants');

module.exports = {
  name: 'warnings',
  description: 'View warnings within the server',
  category: 'Moderation',
  args: true,
  usage: '[(v)iew/(e)dit/(d)elete] [all/(u)ser/(w)arning] [userId/warnId] [reason if edit]',
  async execute(message, args, client) {

    // Require the Collections from the client in the file
    const { modWarnings, botSettings, embeds } = client;
    
    // Make an array of acceptable arguments for args[0] (first argument)
    const choices1 = ['view', 'v', 'edit', 'e', 'delete', 'd'];

    // If args[0] isn't included in the above array then it returns an error
    if (!choices1.includes(args[0])) return await message.reply({ embeds: [embeds.errEmbed(`Invalid arguments provided! Accepted ` +
      `first argument choices are: \`${choices1.join(', ')}\``)] })
      .then(async msg => await cleanReply(message, msg));

    // s!warnings view
    if (args[0] === choices1[0] || args[0] === choices1[1]) {

      // Make an array of acceptable arguments for args[1] (2nd argument)
      const choices2 = ['all', 'user', 'u', 'warning', 'w'];

      // if args[1] isn't included in the above array then it returns an error
      if (!choices2.includes(args[1])) return await message.reply({ embeds: [embeds.errEmbed('Invalid arguments provided! Accepted ' +
        `second argument choices are: \`${choices2.join(', ')}\``)] })
        .then(async msg => await cleanReply(message, msg));

      // s!warnings view all
      if (args[1] === choices2[0]) {

        // Fetch all the warnings and apply it to a variable from the modWarnings Collection properties file
        const warnings = await modWarnings.fetchAll();

        // If no warnings exist then return an error
        if (!warnings) return await message.reply({ embeds: [embeds.errEmbed('No warnings were found in the database!')] })
          .then(async msg => await cleanReply(message, msg));

        // Map the warnings to a new element in a new array
        const array = warnings.map(i => `**Case ${i.id}**\n**Offender:** <@${i.offender}> | \`${i.offender}\`\n**Moderator:** <@${i.moderator}> | \`${i.moderator}\``);

        // Create an embed for the new elements
        const embed = new EmbedBuilder()
          .setTitle('All Warnings')
          .setDescription(`${array.join('\n\n')}`) // Join the elements of the new array together into a single string separated by two line breaks
          .setColor(message.member.displayColor)
          .setAuthor({ name: message.author.tag, iconURL: message.member.displayAvatarURL(true) });

        // Return the embed as a reply to the command
        return await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      }
      // s!warnings view user
      else if (args[1] === choices2[1] || args[1] === choices2[2]) {

        // If no third argument is provided, return an error
        if (!args[2]) return await message.reply({ embeds: [embeds.errEmbed('No third argument was provided! Please make sure you ' +
          'provide a valid Discord User ID!')] })
          .then(async msg => await cleanReply(message, msg));
        
        // Fetch all the user warnings and apply it to a variable from the modWarnings Collection properties file
        const warnings = await modWarnings.fetchAllByUser(args[2]);
        
        // If no user was found or no data exists then return an error
        if (!warnings || warnings.length < 1) return await message.reply({ embeds: [embeds.errEmbed('No warnings were found for this ID! Please make sure you ' +
          'provided a valid Discord User ID!')] })
          .then(async msg => await cleanReply(message, msg));

        // Map the warnings to a new element in a new array
        const array = warnings.map(i => `**Case ${i.id}**\n**Offender:** <@${i.offender}> | \`${i.offender}\`\n**Moderator:** <@${i.moderator}> | \`${i.moderator}\``);

        // Create an embed for the new elements
        const embed = new EmbedBuilder()
          .setTitle(`User Warnings | ${array.length} Total Warnings`)
          .setDescription(`${array.join('\n\n')}`) // Join the elements of the new array together into a single string separated by two line breaks
          .setColor(message.member.displayColor)
          .setAuthor({ name: message.author.tag, iconURL: message.member.displayAvatarURL(true) });

        // Return the embed as a reply to the command
        return await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      }
      // s!warnings view warning
      else if (args[1] === choices2[3] || args[1] === choices2[4]) {
        
        // If no third argument is provided, return an error
        if (!args[2]) return await message.reply({ embeds: [embeds.errEmbed('No third argument was provided! Please make sure you ' +
          'provide a valid warning case ID!')] })
          .then(async msg => await cleanReply(message, msg));

        // Fetch the warning and apply it to a variable from the modWarnings Collection properties file
        const warning = await modWarnings.fetch(args[2]);

        // If no warning was found, return an error
        if (!warning) return await message.reply({ embeds: [embeds.errEmbed('No warning was found matching the provided ID!')] })
          .then(async msg => await cleanReply(message, msg));

        // Create an embed for the warning
        const embed = new EmbedBuilder()
          .setTitle(`Case ${warning.id}`)
          .setAuthor({ name: message.author.tag, iconURL: message.member.displayAvatarURL(true) })
          .setColor(message.member.displayColor)
          .setDescription(`**Offender:** <@${warning.offender}> | \`${warning.offender}\`\n\n**Reason:** *"${warning.reason}"*\n\n**Moderator:** <@${warning.moderator}> | \`${warning.moderator}\``)
          .setFooter({ text: 'Created at' })
          .setTimestamp(warning.createdAt);

        // Return the embed as a reply to the command
        return await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
      }
    }
    // s!warnings edit
    else if (args[0] === choices1[2] || args[0] === choices1[3]) {
      const choices2 = ['warning', 'w'];

      if (!choices2.includes(args[1])) return await message.reply({ embeds: [embeds.errEmbed('Invalid arguments provided! Accepted ' +
        `second argument choices are: \`${choices2.join(', ')}\``)] })
        .then(async msg => await cleanReply(message, msg));

      return await message.reply({ content: 'Selected: Edit Warning', allowedMentions: { repliedUser: false } });
    }
    // s!warnings delete
    else if (args[0] === choices1[4] || args[0] === choices1[5]) {
      const choices2 = ['all', 'user', 'u', 'warning', 'w'];

      if (!choices2.includes(args[1])) return await message.reply({ embeds: [embeds.errEmbed('Invalid arguments provided! Accepted ' +
        `second argument choices are: \`${choices2.join(', ')}\``)] })
        .then(async msg => await cleanReply(message, msg));

      if (args[1] === choices2[0]) {
        return await message.reply({ content: 'Selected: Delete All Warnings', allowedMentions: { repliedUser: false } });
      }
      else if (args[1] === choices2[1] || args[1] === choices2[2]) {
        return await message.reply({ content: 'Selected: Delete User Warnings', allowedMentions: { repliedUser: false } });
      }
      else if (args[1] === choices2[3] || args[1] === choices2[4]) {
        return await message.reply({ content: 'Selected: Delete Warning', allowedMentions: { repliedUser: false } });
      }
    }
  },
};