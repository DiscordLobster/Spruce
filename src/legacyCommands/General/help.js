const { EmbedBuilder } = require('discord.js');

const wait = require('node:timers/promises').setTimeout;

module.exports = {
	name: 'help',
	description: 'Show all commands or display information about a single command!',
	category: 'General',
  aliases: ['info', 'commands'],
	args: false,
	usage: '<commandName>',
	async execute(message, args, client) {
		const { prefixCmds } = client;
		const clientMember = await message.guild.members.fetchMe();

		if (args.length > 0) {
			const commandName = args[0];
			const command = prefixCmds.get(commandName);

			if (!command) return message.reply({ embeds: [client.embeds.errEmbed("No command with this name was found!")] })
				.then(async msg => {
					await wait(5000);
					await msg.delete();
					await message.delete();
				});

			const embed = new EmbedBuilder()
				.setAuthor({ name: `s!${command.name}` })
				.setDescription(`"${command.description}"`)
				.setColor(clientMember.displayColor)
				.setFooter({ text: `Category: ${command.category}` });

				if (command.usage) {
					embed.addFields({ name: 'Usage', value: `s!${command.name} ${command.usage}`, inline: false });
				}

				if (command.aliases) {
					embed.addFields({ name: 'Aliases', value: `${command.aliases.map(k => `s!${k}`).join(', ')}`, inline: false });
				}

			await message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
		}
		else {
			await message.reply({ content: 'Under Construction!', allowedMentions: { repliedUser: false } });
		}
	},
};