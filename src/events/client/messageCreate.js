require('dotenv').config();
const wait = require('node:timers/promises').setTimeout;
const { cleanReply } = require('../../utilities/Constants');

module.exports = {
  name: 'messageCreate',
  async execute(message, client) {
    const { devCommands, prefixCmds } = client;

    /** if (message.author.id === process.env.DEV_ID) {
      const devCommand = devCommands.get(message.content);
      if (!devCommand) return;

      try {
        await devCommand.execute(message, client);
      }
      catch (err) {
        console.error(err);
      }
    } **/
    
    if (message.toString().startsWith('s!')) {

      const args = message.toString().slice(2).trim().split(/ +/);
	    const commandName = args.shift().toLowerCase();

      const command = prefixCmds.get(commandName) || prefixCmds.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

      if (command.devOnly && message.author.id !== process.env.DEV_ID) return;

      if (!command) return;

      if (command.args && args.length < 1) return message.reply({ embeds: [client.embeds.errEmbed(`Missing arguments!\n\nUsage: \`s!${command.name} ${command.usage}\``)] })
        .then(async msg => { await cleanReply(message, msg) });

      try {

        command.execute(message, args, client);
      }
      catch (error) {
        console.error(error);
        message.reply('There was an error executing this command!');
      }
    }
  },
};