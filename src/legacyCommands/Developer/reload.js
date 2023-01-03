const { readdirSync }= require('fs');
const { cleanReply } = require('../../utilities/Constants');

module.exports = {
  name: 'reload',
  description: 'Developer Only',
  devOnly: true,
  category: 'Developer',
  async execute(message, args, client) {
    const { prefixCmds, embeds } = client;

    const commandName = args[0].toLowerCase();
    const command = prefixCmds.get(commandName) || prefixCmds.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return await message.reply({ embeds: [embeds.errEmbed(`No command was found for: ${commandName}`)] })
      .then(async msg => { await cleanReply(message, msg) });

    const commandFolders = readdirSync('./src/legacyCommands');
    const folderName = commandFolders.find(folder => readdirSync(`./src/legacyCommands/${folder}`).includes(`${commandName}.js`));

    delete require.cache[require.resolve(`../${folderName}/${commandName}.js`)];

    try {
      const newCommand = require(`../${folderName}/${commandName}.js`);
      prefixCmds.set(newCommand.name, newCommand);
      await message.reply({ content: `Successfully reloaded: ${commandName}`, allowedMentions: { repliedUser: false } });
    }
    catch (err) {
      console.error(err);
      await message.reply({ content: `There was an issue reloading the command: ${commandName}` })
        .then(async msg => { await cleanReply(message, msg) });
    }
  },
};