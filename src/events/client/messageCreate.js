require('dotenv').config();

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

      if (!prefixCmds.has(commandName)) return;

      const command = prefixCmds.get(commandName);

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