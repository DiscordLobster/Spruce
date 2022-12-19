const { EmbedBuilder } = require('discord.js');

class Embeds {
  static errEmbed(message) {
    const embed = new EmbedBuilder()
    .setDescription(`${message}`)
    .setAuthor({ name: 'ERROR' })
    .setColor([204, 2, 2])
    .setFooter({ text: 'Please contact the developer if you run into troubles!' });

    return embed;
  }

  static warnLogEmbed(id, offender, moderator, reason, dmSent) {
    let check = '❌';
    if (dmSent === true) check = '✅';
    const embed = new EmbedBuilder()
      .setAuthor({ name: offender.user.tag, iconURL: offender.displayAvatarURL(true) })
      .setTitle(`Warning | Case ${id}`)
      .setColor([254, 223, 5])
      .setDescription(`${offender} was warned for reason: \`${reason}\`\n\n*Remember to attach proof for your warnings*\n\nDM Sent: ${check}`)
      .setFooter({ text: `Moderator: ${moderator.user.tag}`, iconURL: moderator.displayAvatarURL(true) })
      .setTimestamp(Date.now());

    return embed;
  }

  static warnDmEmbed(id, offender, moderator, reason) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: offender.user.tag, iconURL: offender.displayAvatarURL(true) })
      .setTitle(`Warning | Case ${id}`)
      .setColor([254, 223, 5])
      .setDescription(`You were warned in Woodlands for: \`${reason}\`\n\nPlease make sure to follow our rules to avoid further infractions`)
      .setFooter({ text: `Moderator: ${moderator.user.tag}`, iconURL: moderator.displayAvatarURL(true) })
      .setTimestamp(Date.now());

    return embed;
  }

  static warnEmbed(offender, moderator, reason) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: offender.user.tag, iconURL: offender.displayAvatarURL(true) })
      .setColor([254, 223, 5])
      .setDescription(`${offender.user.tag}, you've been warned for reason: \`${reason}\`\n\n*Please make sure to follow our rules to avoid any further infractions!*`)
      .setFooter({ text: `Moderator: ${moderator.user.tag}`, iconURL: moderator.displayAvatarURL(true) });

      return embed;
  }

  static banLogEmbed(id, offender, moderator, reason, dmSent) {
    let check = '❌';
    if (dmSent === true) check = '✅';

    const embed = new EmbedBuilder()
      .setAuthor({ name: offender.user.tag, iconURL: offender.displayAvatarURL(true) })
      .setTitle(`Ban | Case ${id}`)
      .setColor([211, 17, 34])
      .setDescription(`${offender} was banned for reason: \`${reason}\`\n\n*Remember to attach proof to bans*\n\nDM Sent: ${check}`)
      .setFooter({ text: `Moderator: ${moderator.user.tag}`, iconURL: moderator.displayAvatarURL(true) })
      .setTimestamp(Date.now());

      return embed;
  }
  
  static banDmEmbed(id, offender, moderator, reason) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: offender.user.tag, iconURL: offender.displayAvatarURL(true) })
      .setTitle(`Ban | Case ${id}`)
      .setColor([211, 17, 34])
      .setDescription(`You were banned in Woodlands for: \`${reason}\`\n\n*If you think this was an error or you'd like to appeal your ban please reach out to the Moderator who commenced the ban with the case number to receive help*`)
      .setFooter({ text: `Moderator: ${moderator.user.tag}`, iconURL: moderator.displayAvatarURL(true) })
      .setTimestamp(Date.now());

      return embed;
  }

  static banEmbed(offender, moderator, reason) {
    const embed = new EmbedBuilder()
      .setAuthor({ name: offender.user.tag, iconURL: offender.displayAvatarURL(true) })
      .setColor([211, 17, 34])
      .setDescription(`${offender.user.tag} was banned for reason: \`${reason}\``)
      .setFooter({ text: `Moderator: ${moderator.user.tag}`, iconURL: moderator.displayAvatarURL(true) })
      .setTimestamp(Date.now());

      return embed;
  }
}

module.exports = Embeds;